/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { View } from 'react-native';
import Login from './Login';
import LoginView from './LoginView';
import color from '../../styles/definitions/color';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

storiesOf('Onboarding/Login', module)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: color.mono.dark }]}>{getStory()}</View>)
  .add('Login', () => (
    <Login />
  ))
  .add('LoginView Default', () => (
    <LoginView
      loading={false}
      onReset={action('onReset')}
      onSubmit={action('onSubmit')}
      onRegister={action('onRegister')}
    />
  ))
  .add('LoginView Loading', () => (
    <LoginView
      loading={true}
      onReset={action('onReset')}
      onSubmit={action('onSubmit')}
      onRegister={action('onRegister')}
    />
  ));
