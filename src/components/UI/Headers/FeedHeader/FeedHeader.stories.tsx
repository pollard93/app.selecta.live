/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import FeedHeader from './FeedHeader';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';

storiesOf('UI/Headers/FeedHeader', module)
  .addDecorator((getStory) => <View style={[GlobalStyles.PageFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>{getStory()}</View>)
  .add('FeedHeader', () => (
    <FeedHeader />
  ));
