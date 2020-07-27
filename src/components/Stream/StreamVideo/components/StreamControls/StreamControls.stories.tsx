/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import StreamControls from './StreamControls';

storiesOf('Stream/StreamVideo/StreamControls', module)
  .addDecorator((getStory) => <View style={{ width: '100%', aspectRatio: 1.7777777778 }}>{getStory()}</View>)
  .addDecorator((getStory) => <CenterView style={{ alignItems: 'center' }}>{getStory()}</CenterView>)
  .add('StreamControls - isPlaying false', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={0}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - isPlaying true', () => (
    <StreamControls
      isPlaying={true}
      onPlayPause={console.log}
      duration={7200}
      position={0}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - buffering', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={3000}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - position', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - loading', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={true}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - error', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={true}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - live', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={true}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - live buffering', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={true}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - isFullScreen', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={true}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - isFullScreen - live', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={true}
      isError={false}
      isLive={true}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={true}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ))
  .add('StreamControls - isAudioOnly', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={true}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={true}
      streamId="1"
    />
  ))
  .add('StreamControls - isVideoEnabled - true', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={true}
      streamId="1"
    />
  ))
  .add('StreamControls - isVideoEnabled - false', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      duration={7200}
      position={7200 / 2}
      onSeek={console.log}
      playableDuration={3000}
      isLoading={false}
      isBuffering={false}
      isError={false}
      isLive={false}
      isAudioOnly={false}
      toggleFullScreen={console.log}
      isFullScreen={false}
      toggleVideoEnabled={console.log}
      isVideoEnabled={false}
      streamId="1"
    />
  ));
