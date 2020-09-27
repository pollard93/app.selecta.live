import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelSelfFeed from './ChannelSelfFeed';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Channel/ChannelSelfFeed', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('ChannelSelfFeed', () => (
    <ChannelSelfFeed flatListProps={{}} />
  ));
