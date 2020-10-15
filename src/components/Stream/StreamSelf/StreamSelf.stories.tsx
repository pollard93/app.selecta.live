import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelf from './StreamSelf';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';

storiesOf('Stream/StreamSelf', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .add('StreamSelf - VOD', () => (
    <StreamSelf id="VOD" />
  ))
  .add('StreamSelf - LIVE', () => (
    <StreamSelf id="LIVE" />
  ))
  .add('StreamSelf - AUDIO_ONLY', () => (
    <StreamSelf id="AUDIO_ONLY" />
  ))
  .add('StreamSelf - CANCELLED', () => (
    <StreamSelf id="CANCELLED" />
  ));
