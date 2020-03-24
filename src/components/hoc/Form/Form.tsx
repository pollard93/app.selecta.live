import React, { Component } from 'react';
import * as EmailValidator from 'email-validator';
import equal from 'deep-equal';

import { FormProps, FormState, Config, ConfigParams, Fields, InitialConfig } from './FormInterfaces';

import Input from '../../UI/Input/Input';

class Form<T> extends Component<FormProps<T>, FormState> {
  unmounted = false;

  constructor(props) {
    super(props);

    const config = this.reduceInitialConfig(this.props.config);

    this.state = {
      config,
      valid: this.validateForm(config),
    };
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  /**
   * Reduces InitialConfig into Config
   */
  reduceInitialConfig = (initialConfig): Config => Object.keys(initialConfig).reduce((acc, key) => {
    const curr = initialConfig[key];

    if (curr instanceof Array) {
      (acc[key] as Config[]) = curr.map((c) => this.reduceInitialConfig(c));
    } else {
      const validation = curr.required === true || curr.value
        ? this.validateInput(curr, curr.value)
        : null;

      (acc[key] as ConfigParams) = {
        ...curr,
        originalValue: curr.value,
        originalValid: ('valid' in curr) ? curr.valid : validation && validation.valid,
        touched: ('touched' in curr) ? curr.touched : false,
        changed: ('changed' in curr) ? curr.changed : false,
        valid: ('valid' in curr) ? curr.valid : validation && validation.valid, // Can override valid if needed, otherwise false if required, null if not
        originalChecked: ('checked' in curr) ? curr.checked : false, // Set original checked value, used in reset
      };
    }

    return acc;
  }, {} as Config)

  componentDidUpdate(prevProps: FormProps<T>) {
    // If initial config changes update config
    // Older forms were built to not support this, so blockUpdate will keep them working this should not be used in new forms!
    if (!equal(prevProps.config, this.props.config)) {
      const config = this.reduceInitialConfig(this.props.config);
      this.setState({
        config,
        valid: this.validateForm(config),
      });
    } else if (this.props.onChange) {
      // On change is used for updating the config dynamically, running when updating config will cause infinite loop
      const variables = this.reduceVariables(this.state.config);
      this.props.onChange(variables, this);
    }
  }

  /**
   * Updates config[key] with value
   * @param config - target config
   * @param masterKeys - if multidemsional config, pass array keys to access it
   * @param key - key of input in config
   * @param value - value of input
   */
  inputChangeHandler = (config: Config, masterKeys: any[], key: string, value: any) => {
    let targetConfig: ConfigParams = config[key] as ConfigParams;

    // Resolve value if passed
    if (targetConfig.resolve) {
      // eslint-disable-next-line no-param-reassign
      value = targetConfig.resolve(value);
    }

    const validation = this.validateInput(targetConfig, value);

    // Update config
    targetConfig = {
      ...targetConfig,
      changed: !equal(value, targetConfig.originalValue),
      touched: true,
      valid: validation.valid,
      value,
    };

    if (!targetConfig.valid && targetConfig.onError) {
      targetConfig.onError(validation.errors);
    }

    const newConfig = {
      ...config,
      [key]: targetConfig,
    };

    // If masterKey is passed, we know the input changed resides within the multi dimensional config somwehere
    // Splice the new config back where it belongs
    if (masterKeys) {
      const stateClone = { ...this.state.config };

      // Uses masterKeys to find the config, referencing the stateClone
      masterKeys.reduce((conf, mKey, i) => {
        if (i === masterKeys.length - 1) {
          // Splice in new config using the key
          (conf as Config[]).splice(mKey, 1, newConfig);
          return conf;
        }
        return conf[mKey];
      }, stateClone as Config);

      // Update state with spliced stateClone
      this.setState({
        config: stateClone,
        valid: this.validateForm(stateClone),
      });
    } else {
      this.setState({
        config: newConfig,
        valid: this.validateForm(newConfig),
      });
    }
  }

  /**
   * Allows multidimensional config to be pushed to or removed
   * Only handles first dimension
   * @param key - key of config
   * @param removeIndex - if removing pass index
   * @param insertData - initial config to be pushed
   */
  updateConfigArray = (key: string, removeIndex: number = null, insertData: InitialConfig) => {
    const targetConfig: Config[] = [...this.state.config[key] as Config[]];

    if (removeIndex != null) {
      targetConfig.splice(removeIndex, 1);
    } else {
      targetConfig.push(this.reduceInitialConfig(insertData));
    }

    const newConfig = {
      ...this.state.config,
      [key]: targetConfig,
    };

    this.setState({
      config: newConfig,
      valid: this.validateForm(newConfig),
    });
  }

  /**
   * Validates entire form
   * Need to pass config as is validated on setState, rather than componentDidUpdate
   */
  validateForm(config: Config): boolean {
    if (this.props.validateForm) return this.props.validateForm(config, this);
    return !this.anyInvalid(config);
  }

  /**
   * Finds any null|false keys
   * Null means originalValue (unchanged, not required), false is invalid
   */
  anyInvalidOrNull = (config: Config): boolean => !!Object.keys(config).find((key): any => {
    if (config[key] instanceof Array) {
      return (config[key] as Config[]).find((k) => this.anyInvalidOrNull(k));
    }

    return !(config[key] as ConfigParams).valid;
  })

  /**
   * Is any key invalid (false)
   */
  anyInvalid = (config: Config): any => Object.keys(config).find((key): any => {
    if (config[key] instanceof Array) {
      return (config[key] as Config[]).find((k) => this.anyInvalid(k));
    }

    return (config[key] as ConfigParams).valid === false;
  })

  /**
   * Is any key valid (true)
   */
  anyValid = (config: Config): boolean => !!Object.keys(config).find((key): any => {
    if (config[key] instanceof Array) {
      return (config[key] as Config[]).find((k) => this.anyValid(k));
    }

    return (config[key] as ConfigParams).valid === true;
  })

  /**
   * Is any key valid (true) and has changed
   */
  anyValidAndChanged = (config: Config): boolean => !!Object.keys(config).find((key): any => {
    if (config[key] instanceof Array) {
      return (config[key] as Config[]).find((k) => this.anyValidAndChanged(k));
    }

    return (config[key] as ConfigParams).valid === true && (config[key] as ConfigParams).changed === true;
  })

  /**
   * Reduces variables in this.state.config for submission
   * Can be overridden by passing props.reduceVariables
   */
  reduceVariables(config: Config): T {
    if (this.props.reduceVariables) return this.props.reduceVariables(config, this);
    return this.flattenVariables(config);
  }

  /**
   * Flatten config to object with values
   * Hanldes multidimensional config
   * @param config
   * @param excludeKeys - keys to exclude from return
   * @param isUpdate - if true, will only return changed and valid items
   */
  flattenVariables(config: Config, excludeKeys?: string[], isUpdate?: boolean): T {
    return Object.keys(config).reduce((acc, key) => {
      const curr = config[key];

      if (excludeKeys && excludeKeys.includes(key)) return acc;

      if (curr instanceof Array) {
        acc[key] = (curr as Config[]).map((c) => this.flattenVariables(c, excludeKeys, false));
      } else if (!isUpdate || (curr.changed && curr.valid)) {
        // If isUpdate only add to return if item is changed and valid
        acc[curr.name] = this.parseValue(curr.value);
      }

      return acc;
    }, {}) as T;
  }

  validateInput(config: ConfigParams, value: any): {valid: boolean; errors?: Error[]} {
    if (['switch'].includes(config.type)) {
      return {
        valid: (
          config.required === true ? !config.value : null
        ),
      };
    }

    const values = this.parseValue(value);
    const pattern = config.pattern || this.getPatternFromType(config.type);
    const errors = [];

    // If array, test each value
    if (values instanceof Array) {
      // eslint-disable-next-line no-restricted-syntax
      for (const v of values) {
        try {
          // Throw if want to pass back an error message
          if (!pattern.test(v)) return { valid: false };
        } catch (e) {
          errors.push(e);
        }
      }

      return {
        valid: !errors.length,
        errors,
      };
    }

    // Single value
    try {
      return {
        valid:
          config.required === true || values !== this.parseValue(config.originalValue) // Test if required or value has changed
            ? pattern.test(values)
            : null, // Null means it's not required and value has not changed (useful for update forms)
      };
    } catch (e) {
      errors.push(e);

      return {
        valid: false,
        errors,
      };
    }
  }

  /**
   * Returns pattern associated with type of input
   * Can return object with 'test' function, so can be used similarly as RegExp
   */
  // eslint-disable-next-line class-methods-use-this
  getPatternFromType(type: string): RegExp | { test: (v) => boolean } {
    switch (type) {
      case 'password':
        return /^.{6,}$/;

      case 'email':
        return {
          test: (v) => EmailValidator.validate(v),
        };

        // case 'file':
        //   return {
        //     test: (v) => {
        //       if (this.props.mimes && v.type && !this.props.mimes.includes(v.type)) {
        //         throw new Error(`${v.name} - Unsupported Mime Type (we accept ${this.props.mimes.map(m => m.replace(/^(.*?)\//, '')).join(', ')})`);
        //       }

        //       if (this.props.maxFileSize && v.size && v.size >= this.props.maxFileSize) {
        //         throw new Error(`${v.name} - File Size Exceeded (maximum ${this.props.maxFileSize / 1000000}mb)`);
        //       }

        //       return true;
        //     },
        //   };

      case 'number':
        return /^\d*\.?\d*$/;

      default:
        return {
          test: (v) => typeof v === 'string' && v.length > 0,
        };
    }
  }

  /**
   * Gets value from raw inout value
   */
  parseValue(value: any) : any {
    if (value instanceof Array) {
      return Array.prototype.map.call(value, (v) => this.parseValue(v));
    }

    return value && typeof value === 'object' && 'value' in value
      ? value.value // react-select value is object with value key
      : value;
  }

  /**
   * Resets forms state to invalid, and removes changed and touched properties
   * @param resetValue - names of the configs keys that should be reset
   * @param resetAll - set to true to reset all values
   */
  reset({ resetValue = [], resetAll = false } = {}) {
    if (this.unmounted) return;
    this.setState({
      config: this.resetConfig(this.state.config, resetValue, resetAll),
      valid: false,
    });
  }

  resetConfig = (config: Config, resetValue = [], resetAll = false): Config => Object.keys(config).reduce((acc, key) => {
    const curr = config[key];

    if (curr instanceof Array) {
      (acc[key] as Config[]) = curr.map((c) => this.resetConfig(c, resetValue, resetAll));
    } else {
      (acc[key] as ConfigParams) = {
        ...curr,
        changed: false,
        touched: false,
        valid: resetAll || resetValue.includes(curr.name) ? curr.originalValid : curr.valid,
        value: resetAll || resetValue.includes(curr.name) ? curr.originalValue : curr.value,
        originalValid: resetAll || resetValue.includes(curr.name) ? curr.originalValid : curr.valid,
        originalValue: resetAll || resetValue.includes(curr.name) ? curr.originalValue : curr.value,
      };
    }

    return acc;
  }, {} as Config)

  renderInput(config: Config, key: string, masterKeys: string[]): JSX.Element {
    return (
      <Input
        {...this.resolveInputConfig(config[key] as ConfigParams)}
        onChange={this.inputChangeHandler.bind(this, config, masterKeys, key)}
      />
    );
  }

  /**
   * Parse top level values into props for styling
   * @param {object} config
   */
  // eslint-disable-next-line class-methods-use-this
  resolveInputConfig(config: ConfigParams) {
    const newConfig = { ...config };

    (newConfig as any) = {
      ...newConfig,
      'data-touched': newConfig.touched,
      'data-changed': newConfig.changed,
      'data-valid': newConfig.valid,
      value: newConfig.value,
    };

    return newConfig;
  }

  onSubmit = (e, ...args: any[]) => {
    const variables = this.reduceVariables(this.state.config);
    return this.props.onSubmit(variables, this, ...args);
  }

  getFields = (config: Config, masterKeys?: string[]): Fields => Object.keys(config).reduce((acc, key) => {
    if ((config[key] instanceof Array)) {
      // Map the config and call this function again, adding key and index to master keys on each loop
      acc[key] = (config[key] as Config[]).map((c, i) => this.getFields(c, (masterKeys ? [...masterKeys, key, i] : [key, i]) as string[]));
    } else {
      acc[key] = this.renderInput(config, key, masterKeys);
    }
    return acc;
  }, {} as Fields)

  render() {
    return this.props.children({
      config: this.state.config,
      fields: this.getFields(this.state.config),
      valid: this.state.valid,
      triggerSubmit: this.onSubmit,
      updateConfigArray: this.updateConfigArray,
      form: this,
    });
  }
}

export default Form;
