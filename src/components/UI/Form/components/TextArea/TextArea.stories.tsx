/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import TextArea from './TextArea';

storiesOf('UI/Form/TextArea', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('TextArea', () => (
    <TextArea
      name="name"
      placeholder="TextArea"
    />
  ))
  .add('TextInput - with error', () => (
    <TextArea
      name="name"
      placeholder="TextInput"
      errors={{
        name: {
          type: 'required',
        },
      }}
    />
  ));
