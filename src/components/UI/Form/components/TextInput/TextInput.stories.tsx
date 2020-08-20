/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import TextInput from './TextInput';

storiesOf('UI/Form/TextInput', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('TextInput', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
    />
  ))
  .add('TextInput - disabled', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
      editable={false}
    />
  ))
  .add('TextInput - with error (required)', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
      errors={{
        name: {
          type: 'required',
        },
      }}
    />
  ))
  .add('TextInput - with error (pattern)', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
      errors={{
        name: {
          type: 'pattern',
        },
      }}
    />
  ))
  .add('TextInput - with error (message)', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
      errors={{
        name: {
          message: 'Custom Message here',
        },
      }}
    />
  ));
