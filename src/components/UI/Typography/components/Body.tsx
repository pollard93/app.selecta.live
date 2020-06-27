import React from 'react';
import { Text, TextProps } from 'react-native';
import Styles from '../Typography.style';

interface TextPropsExt extends TextProps {
  children: any;
  light?: boolean;
  bold?: boolean;
}

const Body = (props: TextPropsExt) => (
  <Text
    {...props}
    style={[Styles.Body, props.light && Styles.light, props.bold && Styles.bold, props.style]}
  />
);

export default Body;
