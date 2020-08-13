/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import SearchInput from './SearchInput';

storiesOf('UI/Form/SearchInput', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('SearchInput', () => (
    <SearchInput
      name="name"
      placeholder="SearchInput"
    />
  ))
  .add('SearchInput - loading', () => (
    <SearchInput
      name="name"
      placeholder="SearchInput"
      loading
    />
  ));
