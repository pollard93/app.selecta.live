/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import TagInput from './TagInput';

storiesOf('UI/Form/TagInput', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('TagInput', () => (
    <TagInput
      onChange={console.log}
    />
  ))
  .add('TagInput - with defaultValue', () => (
    <TagInput
      onChange={console.log}
      defaultValue={['Tag 1', 'Tag 2']}
    />
  ))
  .add('TagInput - disabled', () => (
    <TagInput
      onChange={console.log}
      defaultValue={['Tag 1', 'Tag 2']}
      editable={false}
    />
  ));
