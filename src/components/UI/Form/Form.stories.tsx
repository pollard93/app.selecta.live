/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import SearchInput from './components/SearchInput';

storiesOf('UI/Form', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
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
      placeholder="TextArea"
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
  ));
