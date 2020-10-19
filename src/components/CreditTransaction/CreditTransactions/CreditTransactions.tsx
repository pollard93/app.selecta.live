/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CREDIT_TRANSACTION_PROFILES_QUERY } from '../../../API/query/getCreditTransactionProfiles/getCreditTransactionProfiles';
import { getCreditTransactionProfilesVariables, getCreditTransactionProfiles, getCreditTransactionProfiles_getCreditTransactionProfiles_transactions } from '../../../API/query/getCreditTransactionProfiles/__generated__/getCreditTransactionProfiles';
import CreditTransactionCard from '../../UI/Cards/CreditTransactionCard/CreditTransactionCard';
import Styles from './CreditTransactions.styles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import Body from '../../UI/Typography/components/Body';
import color from '../../../styles/definitions/color';

class CreditTransactionsFlatList extends ApolloFlatList<getCreditTransactionProfilesVariables, getCreditTransactionProfiles, getCreditTransactionProfiles_getCreditTransactionProfiles_transactions> {}

const CreditTransactions: FC = () => (
  <CreditTransactionsFlatList
    query={GET_CREDIT_TRANSACTION_PROFILES_QUERY}
    variables={{
      first: 5,
    }}
    FlatListProps={{
      ItemSeparatorComponent: () => <View style={Styles.separator} />,
      showsVerticalScrollIndicator: false,
    }}
    accessor='getCreditTransactionProfiles.transactions'
    renderItem={({ item }) => (
      <CreditTransactionCard data={item} />
    )}
    ListHeaderComponent={({ queryResult }) => {
      if (queryResult.loading || queryResult.error) {
        return (
          <View style={Styles.header}>
            <LoadRetry {...queryResult} />
          </View>
        );
      }

      if (queryResult.data.getCreditTransactionProfiles.count === 0) {
        return (
          <View>
            <Body style={{ color: color.mono.pale.dark }}>No Purchases</Body>
          </View>
        );
      }

      return null;
    }}
  />
);

export default CreditTransactions;
