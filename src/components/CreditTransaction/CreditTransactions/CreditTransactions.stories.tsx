import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreditTransactions from './CreditTransactions';

storiesOf('CreditTransaction/CreditTransactions', module)
  .add('CreditTransactions', () => (
    <CreditTransactions />
  ));
