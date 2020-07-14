/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Products from './Products';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Products', module)
  .addDecorator(getStory => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator(getStory => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Products', () => (
    <Products onDismiss={console.log} />
  ))