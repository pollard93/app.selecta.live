import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from '../Typography.style';

export interface BaseTextProps extends TextProps {
  children: any;
  light?: boolean;
  forceLight?: boolean;
  bold?: boolean;
  skeleton?: boolean;
  disableBaseColor?: boolean;
}

const Base: FC<BaseTextProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <Text
      {...props}
      style={[
        !props.disableBaseColor && dynamicStyles.base,
        props.style,
        props.light && dynamicStyles.light,
        props.forceLight && Styles.light,
        props.bold && Styles.bold,
        props.skeleton && Styles.skeleton,
      ]}
    />
  );
};

export default Base;
