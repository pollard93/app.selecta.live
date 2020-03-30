import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ConsumerNotifications from './ConsumerNotifications';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('ConsumerNotifications', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('ConsumerNotifications', () => (
    <ConsumerNotifications />
  ));
