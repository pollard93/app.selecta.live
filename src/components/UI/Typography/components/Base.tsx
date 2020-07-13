import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from '../Typography.style';
import { GlobalDynamicStyles } from '../../../../styles/stylesheets/GlobalStyles';

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
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <Text
      {...props}
      style={[
        !props.disableBaseColor && dynamicStyles.base,
        props.style,
        props.light && dynamicStyles.light,
        props.forceLight && Styles.light,
        props.bold && Styles.bold,
        props.skeleton && globalDynamicStyles.skeleton,
      ]}
    />
  );
};

export default Base;
