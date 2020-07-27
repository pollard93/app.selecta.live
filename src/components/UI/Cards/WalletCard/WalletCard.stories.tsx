/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import WalletCard from './WalletCard';
import GetSelfDecorator from '../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';

storiesOf('Cards/WalletCard', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('WalletCard', () => <WalletCard />);
