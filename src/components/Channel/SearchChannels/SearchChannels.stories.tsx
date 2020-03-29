import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SearchChannels from './SearchChannels';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('SearchChannels', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('SearchChannels', () => (
    <SearchChannels />
  ));
