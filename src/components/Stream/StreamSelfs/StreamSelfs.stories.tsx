import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfs from './StreamSelfs';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Stream/StreamSelfs', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('StreamSelfs', () => (
    <StreamSelfs />
  ));
