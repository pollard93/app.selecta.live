import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelFeed from './ChannelFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Channel/ChannelFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelFeed', () => (
    <ChannelFeed id="TEST" flatListProps={{}} />
  ))
  .add('ChannelFeed - has live streams', () => (
    <ChannelFeed id="HAS_LIVE_STREAMS" flatListProps={{}} />
  ));
