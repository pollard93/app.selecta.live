import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamProfile from './StreamProfile';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamProfile', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamProfile - VOD', () => (
    <StreamProfile id="VOD" />
  ))
  .add('StreamProfile - LIVE', () => (
    <StreamProfile id="LIVE" />
  ));
