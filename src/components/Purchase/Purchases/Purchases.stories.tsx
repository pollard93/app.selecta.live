/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import Purchases from './Purchases';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Purchases', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(getStory => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Purchases', () => (
    <Purchases />
  ))