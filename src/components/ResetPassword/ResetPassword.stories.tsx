/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ResetPassword from './ResetPassword';
import ResetPasswordView from './ResetPasswordView';

storiesOf('ResetPassword', module)
  .add('ResetPassword', () => (
    <ResetPassword
      token=""
    />
  ))
  .add('ResetPasswordView Default', () => (
    <ResetPasswordView
      loading={false}
      onSubmit={console.log}
      onPop={console.log}
    />
  ))
  .add('ResetPasswordView Loading', () => (
    <ResetPasswordView
      loading={true}
      onSubmit={console.log}
      onPop={console.log}
    />
  ));
