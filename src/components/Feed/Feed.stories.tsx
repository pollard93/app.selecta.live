import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Feed from './Feed';
import SafeAreaViewDecorator from '../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Feed', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('Feed', () => (
    <Feed />
  ));
