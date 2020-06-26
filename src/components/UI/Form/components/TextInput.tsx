import React, { FC, Ref } from 'react';
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
   */
  const errorMessage = (() => {
    if (!props.errors || !props.errors[props.name]) return null;

    switch (props.errors[props.name].type) {
      case 'required':
        const name = parseCamelCase(props.name).toLowerCase();
        return `Please enter ${/^[aeiou]/i.test(name) ? 'an' : 'a'} ${name}`;

      case 'pattern':
      case 'validate':
        return `Please enter a valid ${parseCamelCase(props.name).toLowerCase()}`;

      default:
        return null;
    }
  })();


  return (
    <View style={[Styles.wrap, props.light && Styles.light]}>
      <TextInputRN
        placeholderTextColor={color.mono.pale.dark}
        {...props}
        ref={props.setRef}
        style={[Styles.TextInput, props.style]}
      />
      {errorMessage && (
        <View style={Styles.error} pointerEvents="none">
          <Small style={Styles.errorText}>{errorMessage}</Small>
        </View>
      )}
    </View>
  );
};

export default TextInput;
