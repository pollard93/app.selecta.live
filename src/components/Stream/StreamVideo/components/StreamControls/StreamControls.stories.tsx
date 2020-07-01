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
      duration={7200}
      initialPosition={0}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
    />
  ))
  .add('StreamControls - isPlaying true', () => (
    <StreamControls
      isPlaying={true}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={0}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
    />
  ))
  .add('StreamControls - buffering', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={3000}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={false}
    />
  ))
  .add('StreamControls - initialPosition', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
    />
  ))
  .add('StreamControls - loading', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={true}
      isBuffering={false}
      isError={false}
      isLive={false}
    />
  ))
  .add('StreamControls - error', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={true}
      isLive={false}
    />
  ))
  .add('StreamControls - live', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={true}
    />
  ))
  .add('StreamControls - live buffering', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      initialPosition={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={true}
    />
  ));
