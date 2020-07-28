import React, { FC } from 'react';
import Styles from '../Form.style';
import TextInput, { TextInputProps } from './TextInput';

const TextArea: FC<TextInputProps> = (props) => (
  <TextInput
    {...props}
    style={[Styles.TextArea, props.style]}
    multiline
  />
);

export default TextArea;
