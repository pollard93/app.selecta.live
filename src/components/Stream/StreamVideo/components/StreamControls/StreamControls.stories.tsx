/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import StreamControls from './StreamControls';

storiesOf('Stream/StreamVideo/StreamControls', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <View style={{ width: '100%', aspectRatio: 1.8 }}>{getStory()}</View>)
  .add('StreamControls - isPlaying false', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={0}
      duration={7200}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - isPlaying true', () => (
    <StreamControls
      isPlaying={true}
      onPlayPause={console.log}
      initialPosition={0}
      duration={7200}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - buffering', () => (
    <StreamControls
      isBuffering={true}
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={0}
      duration={7200}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - initialPosition', () => (
    <StreamControls
      isBuffering={true}
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={7200 / 2}
      duration={7200}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - loading (no duration)', () => (
    <StreamControls
      isBuffering={true}
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={7200 / 2}
      duration={0}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - error', () => (
    <StreamControls
      isError={true}
      isBuffering={true}
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={7200 / 2}
      duration={0}
      onSeek={console.log}
    />
  ));
