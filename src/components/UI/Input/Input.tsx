import React, { Component } from 'react';
import { TextInput, Switch, Picker } from 'react-native';
import { ConfigParams } from '../../hoc/Form/FormInterfaces';

class Input extends Component<ConfigParams> {
  state = {}

  render() {
    switch (this.props.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <TextInput
            {...this.props.textInputProps}
            style={[
              // eslint-disable-next-line react-native/no-inline-styles
              { width: '100%' },
              this.props.textInputProps ? this.props.textInputProps.style : {},
            ]}
            onChangeText={(value) => {
              this.props.onChange(value);
            }}
            value={this.props.value}
            secureTextEntry={this.props.type === 'password'}
          />
        );

      case 'switch':
        return (
          <Switch
            {...this.props.switchProps}
            onValueChange={(value) => {
              this.props.onChange(value);
            }}
            value={this.props.value}
          />
        );

      case 'picker':
        return (
          <Picker
            {...this.props.pickerProps}
            selectedValue={this.props.value}
            onValueChange={(itemValue) => {
              this.props.onChange(itemValue);
            }}
          >
            {this.props.options.map((o) => (
              <Picker.Item
                key={o.value}
                label={o.label}
                value={o.value}
              />
            ))}
          </Picker>
        );

      default:
        return null;
    }
  }
}

export default Input;
