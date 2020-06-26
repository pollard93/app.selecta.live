import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Login from './Login';
import LoginView from './LoginView';
import SafeAreaViewDecorator from '../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/Login', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</SafeAreaViewDecorator>)
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
