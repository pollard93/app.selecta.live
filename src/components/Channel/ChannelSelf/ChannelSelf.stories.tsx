import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelSelf from './ChannelSelf';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Channel/ChannelSelf', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelSelf', () => (
    <ChannelSelf />
  ));
