/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import DateInput from './DateInput';

storiesOf('UI/Form/DateInput', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('DateInput - date', () => (
    <DateInput
      value={new Date().toISOString()}
      mode="date"
      inputRef={{ current: null }}
      onChange={console.log}
      minimumDate={new Date(Date.now())}
    />
  ))
  .add('DateInput - time', () => (
    <DateInput
      value={new Date().toISOString()}
      mode="time"
      inputRef={{ current: null }}
      onChange={console.log}
      minimumDate={new Date(Date.now())}
    />
  ));
