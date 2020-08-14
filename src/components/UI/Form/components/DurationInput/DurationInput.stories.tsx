/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import DurationInput from './DurationInput';

storiesOf('UI/Form/DurationInput', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('DurationInput', () => (
    <DurationInput
      onChange={console.log}
      inputRef={{ current: null }}
    />
  ))
  .add('DurationInput - with value', () => (
    <DurationInput
      value={4500000} // 1 hour 15 minutes in ms
      inputRef={{ current: null }}
      onChange={console.log}
    />
  ))
  .add('DurationInput - disabled', () => (
    <DurationInput
      value={4500000} // 1 hour 15 minutes in ms
      inputRef={{ current: null }}
      onChange={console.log}
      editable={false}
    />
  ));
