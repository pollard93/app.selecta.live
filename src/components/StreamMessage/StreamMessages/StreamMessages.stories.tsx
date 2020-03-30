import React from 'react';
import { storiesOf } from '@storybook/react-native';
import StreamMessages from './StreamMessages';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('StreamMessages', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamMessages', () => (
    <StreamMessages id="test" />
  ));
