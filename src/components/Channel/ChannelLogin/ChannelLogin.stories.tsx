import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelLogin from './ChannelLogin';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('ChannelLogin', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('ChannelLogin', () => (
    <ChannelLogin id="test" />
  ));
