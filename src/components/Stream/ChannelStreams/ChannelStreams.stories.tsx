import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelStreams from './ChannelStreams';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ChannelStreams', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelStreams', () => (
    <ChannelStreams id="test" />
  ));
