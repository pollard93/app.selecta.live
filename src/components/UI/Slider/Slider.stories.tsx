/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import Slider from './Slider';

storiesOf('UI/Slider', module)
  .addDecorator((getStory) => <CenterView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'stretch' }}>{getStory()}</CenterView>)
  .add('Slider', () => (
    <Slider
      value={25}
      minimumValue={0}
      maximumValue={100}
      onValueChange={console.log}
      tracks={[
        { color: 'white', width: 1 },
        { color: 'blue', width: 0.75 },
        { color: 'red', width: 0.5 },
        { color: 'green', width: 0.25 },
      ]}
    />
  ))
  .add('Slider - loading', () => (
    <Slider
      value={50}
      minimumValue={0}
      maximumValue={100}
      onValueChange={console.log}
      tracks={[
        { color: 'white', width: 1 },
        { color: 'blue', width: 0.75 },
        { color: 'red', width: 0.5 },
        { color: 'green', width: 0.25 },
      ]}
      loading={true}
    />
  ));
