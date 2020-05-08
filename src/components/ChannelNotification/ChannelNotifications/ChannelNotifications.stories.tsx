import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelNotifications from './ChannelNotifications';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ChannelNotifications', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelNotifications', () => (
    <ChannelNotifications />
  ));
