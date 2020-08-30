/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Wallet from './Wallet';
import GetSelfDecorator from '../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';

storiesOf('Wallet', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .add('Wallet', () => <Wallet />);
