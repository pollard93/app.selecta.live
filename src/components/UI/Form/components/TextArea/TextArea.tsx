import React, { FC } from 'react';
import Styles from './TextArea.style';
import TextInput, { TextInputProps } from '../TextInput/TextInput';

const TextArea: FC<TextInputProps> = (props) => (
  <TextInput
    {...props}
    style={[Styles.input, props.style]}
    multiline
  />
);

export default TextArea;
