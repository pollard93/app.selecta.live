import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelfs from './StreamSelfs';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Stream/StreamSelfs', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamSelfs', () => (
    <StreamSelfs />
  ));
