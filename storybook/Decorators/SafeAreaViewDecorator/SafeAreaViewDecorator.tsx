/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function SafeAreaViewDecorator({ children, styles = {} }) {
  return (
    <SafeAreaView style={[
      {
        flex: 1,
        width: '100%',
      },
      styles,
    ]}>
      {children}
    </SafeAreaView>
  );
}
