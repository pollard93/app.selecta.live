import React from 'react';
import { storiesOf } from '@storybook/react-native';
import PaidForStreams from './PaidForStreams';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('PaidForStreams', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('PaidForStreams', () => (
    <PaidForStreams />
  ));
