import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelProfileFeed from './ChannelProfileFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('ChannelProfileFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelProfileFeed', () => (
    <ChannelProfileFeed id="TEST" flatListProps={{}} />
  ))
  .add('ChannelProfileFeed - has live streams', () => (
    <ChannelProfileFeed id="HAS_LIVE_STREAMS" flatListProps={{}} />
  ));
