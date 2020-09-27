/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DurationPicker from './DurationPicker';

storiesOf('UI/DateTimePicker/DurationPicker', module)
  .add('DurationPicker', () => (
    <DurationPicker
      defaultHours={0}
      defaultMinutes={0}
      onDone={console.log}
    />
  ));
