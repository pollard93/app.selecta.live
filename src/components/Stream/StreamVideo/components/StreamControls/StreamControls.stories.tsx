import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import StreamControls from './StreamControls';

storiesOf('Stream/StreamVideo/StreamControls', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <View style={{ width: '100%', aspectRatio: 1.8 }}>{getStory()}</View>)
  .add('StreamControls - 1 minute', () => (
    <StreamControls
      isPlaying={true}
      onPlayPause={console.log}
      initialPosition={0}
      duration={60}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - 1 hour', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={0}
      duration={3600}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - 2 hour', () => (
    <StreamControls
      isPlaying={false}
      onPlayPause={console.log}
      initialPosition={0}
      duration={7200}
      onSeek={console.log}
    />
  ));
