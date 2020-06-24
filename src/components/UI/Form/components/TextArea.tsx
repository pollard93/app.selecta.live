import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import Styles from '../Form.style';
import color from '../../../../styles/definitions/color';

const TextArea = (props: TextInputProps) => (
  <TextInput
    placeholderTextColor={color.mono.pale.dark}
    {...props}
    style={[Styles.TextInput, Styles.TextArea, props.style]}
    multiline
  />
);

export default TextArea;
