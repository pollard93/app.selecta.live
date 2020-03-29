import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SearchStreams from './SearchStreams';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('SearchStreams', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('SearchStreams', () => (
    <SearchStreams />
  ));
