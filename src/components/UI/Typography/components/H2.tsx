import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import Styles from '../Typography.style';

interface TextPropsExt extends TextProps {
  children: any;
  light?: boolean;
}

const H2: FC<TextPropsExt> = (props) => (
  <Text
    {...props}
    style={[Styles.H2, props.light && Styles.light, props.style]}
  />
);

export default H2;
