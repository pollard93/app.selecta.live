/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const CenterView: FC<ViewProps> = (props) => (
  <View style={[
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#F5FCFF',
    },
    props.style,
  ]}>
    {props.children}
  </View>
);

export default CenterView;
