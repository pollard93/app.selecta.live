/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import RegisterView from './RegisterView';
import Register from './Register';
import SafeAreaViewDecorator from '../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Onboarding/Register', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</SafeAreaViewDecorator>)
  .add('Register', () => (
    <Register />
  ))
  .add('RegisterView Default', () => (
    <RegisterView
      loading={false}
      onSubmit={action('onSubmit')}
    />
  ))
  .add('RegisterView Loading', () => (
    <RegisterView
      loading={true}
      onSubmit={action('onSubmit')}
    />
  ));