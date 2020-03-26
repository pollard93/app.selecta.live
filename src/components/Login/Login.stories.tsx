import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../hoc/CenterView/CenterView';
import Login from './Login';
import LoginView from './LoginView';

storiesOf('Login', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
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
  ))
  .add('LoginView Reset', () => (
    <LoginView
      loading={false}
      onReset={action('onReset')}
      onSubmit={action('onSubmit')}
      onRegister={action('onRegister')}
    />
  ))
  .add('LoginView Reset Loading', () => (
    <LoginView
      loading={true}
      onReset={action('onReset')}
      onSubmit={action('onSubmit')}
      onRegister={action('onRegister')}
    />
  ));
