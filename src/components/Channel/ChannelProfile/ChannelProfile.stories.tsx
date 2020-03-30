import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelProfile from './ChannelProfile';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ChannelProfile', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelProfile', () => (
    <ChannelProfile id="test" />
  ));
