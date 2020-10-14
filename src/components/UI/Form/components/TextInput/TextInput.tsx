import React, { FC, MutableRefObject, useMemo, useState } from 'react';
import { TextInput as TextInputRN, TextInputProps as TextInputPropsRN, View, StyleProp, ViewStyle } from 'react-native';
import { FieldError, NestDataObject } from 'react-hook-form';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './TextInput.style';
import color from '../../../../../styles/definitions/color';
import Small from '../../../Typography/components/Small';
import { capitaliseWords, parseCamelCase } from '../../../../../utils/functions';

export interface TextInputProps extends TextInputPropsRN {
  name: string;
  label?: string; // Defaults to name, pass null to hide
  setRef?: MutableRefObject<TextInputRN>;
  errors?: NestDataObject<any, FieldError>; // The entire errors object from react-hook-form
  wrapStyle?: StyleProp<ViewStyle>;
}

const TextInput: FC<TextInputProps> = (props) => {
  const [hasContent, setHasContent] = useState(!!props.defaultValue);
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * Get error message from props.errors
   * Checks react-hook-forms error object for an error using props.name
   * Specific error messages can be configured in the register() validation options
   */
  const errorMessage = useMemo(() => {
    if (!props.errors || !props.errors[props.name]) return null;

    // If message is defined then return it
    if (props.errors[props.name].message) {
      if (props.errors[props.name].message === 'DO_NOT_DISPLAY') return null;
      return props.errors[props.name].message;
    }

    // Default to generic error message
    switch (props.errors[props.name].type) {
      case 'required':
        const name = parseCamelCase(props.name).toLowerCase();
        return `Please enter ${/^[aeio]/i.test(name) ? 'an' : 'a'} ${name}`;

      case 'pattern':
      case 'validate':
        return `Please enter a valid ${parseCamelCase(props.name).toLowerCase()}`;

      default:
        return null;
    }
  }, [props.errors && props.errors[props.name]]);


  /**
   * Get wrapClasses
   */
  const wrapClasses = useMemo(() => {
    const classes = [Styles.wrap, dynamicStyles.wrap, props.wrapStyle];
    if ((hasContent && props.label !== null) || errorMessage) classes.push(Styles.showingLabel);
    if (props.editable === false) classes.push(Styles.disabled);
    return classes;
  }, [props.wrapStyle, hasContent, errorMessage, props.editable]);


  return (
    <View style={wrapClasses}>
      <TextInputRN
        placeholderTextColor={color.mono.pale.dark}
        {...props}
        onChangeText={(v) => {
          props.onChangeText(v);

          if (!hasContent && !!v) {
            setHasContent(true);
          } else if (hasContent && !v) {
            setHasContent(false);
          }
        }}
        ref={props.setRef}
        style={[Styles.input, dynamicStyles.input, props.style]}
      />
      {
        errorMessage && (
          <View style={Styles.label} pointerEvents="none">
            {React.isValidElement(errorMessage) ? errorMessage : <Small style={Styles.error}>{errorMessage}</Small>}
          </View>
        )
      }
      {
        !errorMessage && hasContent && props.label !== null && (
          <View style={Styles.label} pointerEvents="none">
            <Small style={Styles.labelText}>{props.label || capitaliseWords(props.name)}</Small>
          </View>
        )
      }
    </View>
  );
};

export default TextInput;
