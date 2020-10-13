import React, { FC, MutableRefObject, useMemo } from 'react';
import { TextInput as TextInputRN, TextInputProps as TextInputPropsRN, View, StyleProp, ViewStyle } from 'react-native';
import { FieldError, NestDataObject } from 'react-hook-form';
import Styles from './TextInput.style';
import color from '../../../../../styles/definitions/color';
import Small from '../../../Typography/components/Small';
import { parseCamelCase } from '../../../../../utils/functions';

export interface TextInputProps extends TextInputPropsRN {
  name: string;
  setRef?: MutableRefObject<TextInputRN>;
  errors?: NestDataObject<any, FieldError>; // The entire errors object from react-hook-form
  wrapStyle?: StyleProp<ViewStyle>;
}

const TextInput: FC<TextInputProps> = (props) => {
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


  return (
    <View style={[Styles.wrap, props.wrapStyle, errorMessage && Styles.wrapError, props.editable === false && Styles.disabled]}>
      <TextInputRN
        placeholderTextColor={color.mono.pale.dark}
        {...props}
        ref={props.setRef}
        style={[Styles.input, props.style]}
      />
      {errorMessage && (
        <View style={Styles.error} pointerEvents="none">
          {React.isValidElement(errorMessage) ? errorMessage : <Small style={Styles.errorText}>{errorMessage}</Small>}
        </View>
      )}
    </View>
  );
};

export default TextInput;
