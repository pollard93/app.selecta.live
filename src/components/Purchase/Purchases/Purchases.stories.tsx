/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Purchases from './Purchases';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';

storiesOf('Purchases', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Purchases', () => (
    <Purchases />
  ))