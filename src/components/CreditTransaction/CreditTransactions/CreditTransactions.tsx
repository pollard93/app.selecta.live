/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CREDIT_TRANSACTION_PROFILES_QUERY } from '../../../API/query/getCreditTransactionProfiles/getCreditTransactionProfiles';
import { getCreditTransactionProfilesVariables, getCreditTransactionProfiles, getCreditTransactionProfiles_getCreditTransactionProfiles_transactions } from '../../../API/query/getCreditTransactionProfiles/__generated__/getCreditTransactionProfiles';
import CreditTransactionCard from '../../UI/Cards/CreditTransactionCard/CreditTransactionCard';

class CreditTransactionsFlatList extends ApolloFlatList<getCreditTransactionProfilesVariables, getCreditTransactionProfiles, getCreditTransactionProfiles_getCreditTransactionProfiles_transactions> {}

const CreditTransactions: FC = () => (
  <CreditTransactionsFlatList
    query={GET_CREDIT_TRANSACTION_PROFILES_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getCreditTransactionProfiles.transactions'
    renderItem={({ item }) => (
      <View>
        <CreditTransactionCard data={item} />
      </View>
    )}
  />
);

export default CreditTransactions;
