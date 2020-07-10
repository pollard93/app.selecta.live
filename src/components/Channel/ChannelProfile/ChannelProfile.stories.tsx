/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelProfile from './ChannelProfile';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import DarkModeDecorator from '../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('Channel/ChannelProfile', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('ChannelProfile', () => (
    <ChannelProfile id="HAS_LIVE_STREAMS" />
  ));
