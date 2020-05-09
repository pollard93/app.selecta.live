import React from 'react';
import { storiesOf } from '@storybook/react-native';
import RequestedChannels from './RequestedChannels';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('RequestedChannels', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('RequestedChannels', () => (
    <RequestedChannels />
  ));
