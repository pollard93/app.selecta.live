/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import MessageInput from './MessageInput';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('UI/Form/MessageInput', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('MessageInput', () => (
    <MessageInput
      message=""
      setMessage={console.log}
      placeholder="Placeholder"
      onSubmit={console.log}
      editable={false}
      disabled={false}
    />
  ))
  .add('MessageInput - with text', () => (
    <MessageInput
      message="With Text"
      setMessage={console.log}
      placeholder="Placeholder"
      onSubmit={console.log}
      editable={false}
      disabled={false}
    />
  ))
  .add('MessageInput - disabled', () => (
    <MessageInput
      message=""
      setMessage={console.log}
      placeholder="Placeholder"
      onSubmit={console.log}
      editable={false}
      disabled={true}
    />
  ));
