/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import LiveConsumers from './LiveConsumers';

storiesOf('UI/LiveConsumers', module)
  .addDecorator((getStory) => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{getStory()}</View>)
  .add('LiveConsumers - under thousand', () => (
    <LiveConsumers count={999} />
  ))
  .add('LiveConsumers - thousand', () => (
    <LiveConsumers count={1123} />
  ))
  .add('LiveConsumers - 900000', () => (
    <LiveConsumers count={900000} />
  ))
  .add('LiveConsumers - 5650000', () => (
    <LiveConsumers count={5650000} />
  ));
