import React from 'react';
import { Text, TextProps } from 'react-native';
import Styles from '../Typography.style';

interface TextPropsExt extends TextProps {
  children: any;
  light?: boolean;
}

const H3 = (props: TextPropsExt) => (
  <Text
    {...props}
    style={[Styles.H3, props.light && Styles.light, props.style]}
  />
);

export default H3;
