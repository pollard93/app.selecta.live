import React from 'react';
import { Text, TextProps } from 'react-native';
import Styles from '../Typography.style';

interface TextPropsExt extends TextProps {
  children: any;
  light?: boolean;
}

const Small = (props: TextPropsExt) => (
  <Text
    {...props}
    style={[Styles.Small, props.light && Styles.light, props.style]}
  />
);

export default Small;
