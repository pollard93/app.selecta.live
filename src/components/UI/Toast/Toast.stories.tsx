/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Toast from './Toast';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import ToastDecorator from '../../../../storybook/Decorators/ToastDecorator/ToastDecorator';

storiesOf('UI/Toast', module)
  .addDecorator((getStory) => <ToastDecorator>{getStory()}</ToastDecorator>)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { justifyContent: 'flex-start', backgroundColor: 'white' }]}>{getStory()}</View>)
  .add('Toast - info', () => (
    <Toast
      type="INFO"
      content="Toast - info"
    />
  ))
  .add('Toast - long text', () => (
    <Toast
      type="INFO"
      content="Toast - info info info info info info info info info info info"
    />
  ))
  .add('Toast - success', () => (
    <Toast
      type="SUCCESS"
      content="Toast - Success"
    />
  ))
  .add('Toast - error', () => (
    <Toast
      type="ERROR"
      content="Toast - error"
    />
  ));
