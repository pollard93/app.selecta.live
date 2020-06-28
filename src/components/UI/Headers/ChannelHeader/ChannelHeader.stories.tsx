/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import ChannelHeader from './ChannelHeader';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import GetSelfDecorator from '../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('UI/Headers/ChannelHeader', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={[GlobalStyles.PageFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>{getStory()}</SafeAreaViewDecorator>)
  .add('ChannelHeader', () => (
    <ChannelHeader id="TEST" />
  ));
