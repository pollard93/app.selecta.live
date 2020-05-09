import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Notifications from './Notifications';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Notifications', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('Notifications', () => (
    <Notifications />
  ));
