import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CalculateStreamRevenue from './CalculateStreamRevenue';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import GetChannelSelfDecorator from '../../../../storybook/Decorators/GetChannelSelfDecorator/GetChannelSelfDecorator';

storiesOf('CalculateStreamRevenue', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <GetChannelSelfDecorator>{getStory()}</GetChannelSelfDecorator>)
  .add('CalculateStreamRevenue', () => (
    <CalculateStreamRevenue />
  ));
