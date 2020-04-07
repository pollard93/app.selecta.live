import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamProfile from './StreamProfile';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('StreamProfile', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamProfile', () => (
    <StreamProfile id="test" />
  ));
