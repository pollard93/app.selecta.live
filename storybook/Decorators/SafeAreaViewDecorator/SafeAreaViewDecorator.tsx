/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC } from 'react';
import { SafeAreaView, ViewProps } from 'react-native';

const SafeAreaViewDecorator: FC<ViewProps> = (props) => (
  <SafeAreaView style={[
    {
      flex: 1,
      width: '100%',
    },
    props.style,
  ]}>
    {props.children}
  </SafeAreaView>
);

export default SafeAreaViewDecorator;
