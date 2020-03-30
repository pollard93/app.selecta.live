/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import RegisterView from './RegisterView';
import Register from './Register';
import CenterView from '../../../storybook/Decorators/CenterView/CenterView';

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