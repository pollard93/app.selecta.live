import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelSelf from './ChannelSelf';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ChannelSelf', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelSelf', () => (
    <ChannelSelf />
  ));
