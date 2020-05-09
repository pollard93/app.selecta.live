import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelSelfs from './ChannelSelfs';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ChannelSelfs', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelSelfs', () => (
    <ChannelSelfs />
  ));
