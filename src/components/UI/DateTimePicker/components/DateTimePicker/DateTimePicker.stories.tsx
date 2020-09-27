/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import DateTimePicker from './DateTimePicker';

storiesOf('UI/DateTimePicker/DateTimePicker', module)
  .add('DateTimePicker', () => (
    <DateTimePicker
      pickerProps={{
        value: new Date(),
        mode: 'date',
        display: 'default',
        onChange: null, // Overridden in component
        // minimumDate: props.minimumDate,
        // maximumDate: props.maximumDate,
      }}
      onDone={console.log}
    />
  ));
