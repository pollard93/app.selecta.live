/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import Chip from './Chip';

storiesOf('UI/Chip', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</CenterView>)
  .add('Chip - PRIMARY', () => (
    <Chip
      type="PRIMARY"
    >
      Content
    </Chip>
  ))
  .add('Chip - PRIMARY - bold', () => (
    <Chip
      type="PRIMARY"
      bold
    >
      Content
    </Chip>
  ))
  .add('Chip - SECONDARY', () => (
    <Chip
      type="SECONDARY"
    >
      Content
    </Chip>
  ))
  .add('Chip - LIGHT', () => (
    <Chip
      type="LIGHT"
    >
      Content
    </Chip>
  ));
