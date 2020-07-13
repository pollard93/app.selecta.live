/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, View, StyleSheet } from 'react-native';
import Drawer from './Drawer';

storiesOf('UI/Drawer', module)
  .add('Drawer', () => (
    <Drawer
      minHeight={200}
      maxHeight={600}
    >
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'yellow', justifyContent: 'center' }}>
        <Text>Hello</Text>
      </View>
    </Drawer>
  ));
