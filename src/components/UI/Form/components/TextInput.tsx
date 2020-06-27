import React, { FC, Ref, useMemo } from 'react';
import { TextInput as TextInputRN, TextInputProps, View } from 'react-native';
import { FieldError, NestDataObject } from 'react-hook-form';
import Styles from '../Form.style';
import color from '../../../../styles/definitions/color';
import Small from '../../Typography/components/Small';
import { parseCamelCase } from '../../../../utils/functions';

interface TextInputPropsExt extends TextInputProps {
  name: string;
  light?: boolean; // Light background
  setRef?: Ref<any>;
  errors?: NestDataObject<any, FieldError>; // The entire errors object from react-hook-form
}

const TextInput: FC<TextInputPropsExt> = (props) => {
  /**
   * Get error message from props.errors
   * Checks react-hook-forms error object for an error using props.name
   * Specific error messages can be configured in the register() validation options
   */
  const errorMessage = useMemo(() => {
    if (!props.errors || !props.errors[props.name]) return null;

    // If message is defined then return it
    if (props.errors[props.name].message) return props.errors[props.name].message;

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
    <View style={[Styles.wrap, props.light && Styles.light]}>
      <TextInputRN
        placeholderTextColor={color.mono.pale.dark}
        {...props}
        ref={props.setRef}
        style={[Styles.TextInput, props.style]}
      />
      {errorMessage && (
        <View style={[Styles.error, props.light && Styles.errorLight]} pointerEvents="none">
          {React.isValidElement(errorMessage) ? errorMessage : <Small style={Styles.errorText}>{errorMessage}</Small>}
        </View>
      )}
    </View>
  );
};

export default TextInput;
