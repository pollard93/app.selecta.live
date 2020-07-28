import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelSelfFeed from './ChannelSelfFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('ChannelSelfFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelSelfFeed', () => (
    <ChannelSelfFeed id="TEST" flatListProps={{}} />
  ))
  .add('ChannelSelfFeed - has live streams', () => (
    <ChannelSelfFeed id="HAS_LIVE_STREAMS" flatListProps={{}} />
  ));
