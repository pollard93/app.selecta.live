/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Purchases from './Purchases';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Purchases', module)
  .addDecorator(getStory => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator(getStory => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Purchases', () => (
    <Purchases onDismiss={console.log} />
  ))