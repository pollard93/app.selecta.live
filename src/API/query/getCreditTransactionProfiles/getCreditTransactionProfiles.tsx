/* eslint-disable max-len */
import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { CREDIT_TRANSACTION_PROFILE_FRAGMENT } from '../../fragments/CreditTransactionProfile';
import { getCreditTransactionProfiles, getCreditTransactionProfilesVariables } from './__generated__/getCreditTransactionProfiles';

export const GET_CREDIT_TRANSACTION_PROFILES_QUERY = gql`
  query getCreditTransactionProfiles($first: Int, $after: String, $orderBy: CreditTransactionOrderByInput){
    getCreditTransactionProfiles(first: $first, after: $after, orderBy: $orderBy){
      transactions {
        ...CREDIT_TRANSACTION_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${CREDIT_TRANSACTION_PROFILE_FRAGMENT}
`;

export const useGetCreditTransactionProfilesQuery = (options?: QueryHookOptions<getCreditTransactionProfiles, getCreditTransactionProfilesVariables>) => useQuery(GET_CREDIT_TRANSACTION_PROFILES_QUERY, options);
