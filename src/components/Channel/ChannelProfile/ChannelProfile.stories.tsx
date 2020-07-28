import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelProfile from './ChannelProfile';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Channel/ChannelProfile', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelProfile', () => (
    <ChannelProfile id="HAS_LIVE_STREAMS" />
  ));
