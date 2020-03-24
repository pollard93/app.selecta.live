/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../hoc/CenterView/CenterView';
import RegisterView from './RegisterView';
import Register from './Register';

storiesOf('Register', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
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