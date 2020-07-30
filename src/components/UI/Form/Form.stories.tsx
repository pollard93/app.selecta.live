/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import SearchInput from './components/SearchInput';
import DateTimePickerInput from '../DateTimePicker/components/DateTimePickerInput/DateTimePickerInput';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import DateInput from './components/DateInput';
import TimeInput from './components/TimeInput';


storiesOf('UI/Form', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('TextInput', () => (
    <TextInput
      name="name"
      placeholder="TextInput"
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
  .add('TextArea', () => (
    <TextArea
      name="name"
      placeholder="TextArea"
    />
  ))
  .add('TextArea - with error (required)', () => (
    <TextArea
      name="name"
      placeholder="TextArea"
      errors={{
        name: {
          type: 'required',
        },
      }}
    />
  ))
  .add('TextArea - with error (pattern)', () => (
    <TextArea
      name="name"
      placeholder="TextArea"
      errors={{
        name: {
          type: 'pattern',
        },
      }}
    />
  ))
  .add('SearchInput', () => (
    <SearchInput
      placeholder="SearchInput"
    />
  ))
  .add('SearchInput - loading', () => (
    <SearchInput
      placeholder="SearchInput"
      loading={true}
    />
  ))
  .add('DateInput', () => (
    <DateInput
      value={new Date().toISOString()}
      defaultValue={new Date().toISOString()}
      onChange={console.log}
      minimumDate={new Date(Date.now())}
    />
  ))
  .add('TimeInput', () => (
    <TimeInput
      value={new Date().toISOString()}
      defaultValue={new Date().toISOString()}
      onChange={console.log}
      minimumDate={new Date(Date.now())}
    />
  ));
