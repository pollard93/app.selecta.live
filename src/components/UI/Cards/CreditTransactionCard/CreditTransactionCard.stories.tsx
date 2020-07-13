/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CreditTransactionCard from './CreditTransactionCard';
import GetSelfDecorator from '../../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetCreditTransactionProfilesQuery } from '../../../../API/query/getCreditTransactionProfiles/getCreditTransactionProfiles';
import color from '../../../../styles/definitions/color';

storiesOf('Cards/CreditTransactionCard', module)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: color.mono.pale.light }}>{getStory()}</SafeAreaViewDecorator>)
  .add('CreditTransactionCard', () => {
    const TestComponent = () => {
      const queryResult = useGetCreditTransactionProfilesQuery();
      if (queryResult.loading) return null;
      return <CreditTransactionCard data={queryResult.data.getCreditTransactionProfiles.transactions[0]} />;
    };
    return <TestComponent />;
  });
