import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfs from './StreamSelfs';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';

storiesOf('Stream/StreamSelfs', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .add('StreamSelfs', () => (
    <StreamSelfs />
  ));
