/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import RequestPasswordResetView from './RequestPasswordResetView';
import RequestPasswordReset from './RequestPasswordReset';
import SafeAreaViewDecorator from '../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('RequestPasswordReset', module)
  .addDecorator(getStory => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('RequestPasswordReset', () => (
    <RequestPasswordReset onCompletion={console.log} />
  ))
  .add('RequestPasswordResetView Default', () => (
    <RequestPasswordResetView
      defaultEmailValue=""
      loading={false}
      onSubmit={console.log}
      onPop={console.log}
    />
  ))
  .add('RequestPasswordResetView Loading', () => (
    <RequestPasswordResetView
      defaultEmailValue=""
      loading={true}
      onSubmit={console.log}
      onPop={console.log}
    />
  ))
  .add('RequestPasswordResetView - defaultEmailValue (valid)', () => (
    <RequestPasswordResetView
      defaultEmailValue="dev@madebyprism.com"
      loading={false}
      onSubmit={console.log}
      onPop={console.log}
    />
  ))
  .add('RequestPasswordResetView - defaultEmailValue (invalid)', () => (
    <RequestPasswordResetView
      defaultEmailValue="invalid-email"
      loading={false}
      onSubmit={console.log}
      onPop={console.log}
    />
  ));