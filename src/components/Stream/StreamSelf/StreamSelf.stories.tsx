import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamSelf from './StreamSelf';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('StreamSelf', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamSelf', () => (
    <StreamSelf id="test" />
  ));
