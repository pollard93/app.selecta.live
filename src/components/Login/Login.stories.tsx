/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Login from './Login';
import LoginView from './LoginView';

storiesOf('Onboarding/Login', module)
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
