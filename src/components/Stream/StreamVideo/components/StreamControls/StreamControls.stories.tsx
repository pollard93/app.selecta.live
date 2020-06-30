import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../../../storybook/Decorators/CenterView/CenterView';
import StreamControls from './StreamControls';

storiesOf('Stream/StreamVideo/StreamControls', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('StreamControls - 1 minute', () => (
    <StreamControls
      playerPosition={0}
      duration={60}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - 1 hour', () => (
    <StreamControls
      playerPosition={0}
      duration={3600}
      onSeek={console.log}
    />
  ))
  .add('StreamControls - 2 hour', () => (
    <StreamControls
      playerPosition={0}
      duration={7200}
      onSeek={console.log}
    />
  ));
