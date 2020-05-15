import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getProductConfig } from './__generated__/getProductConfig';

export const GET_PRODUCT_CONFIG_QUERY = gql`
  query getProductConfig {
    getProductConfig {
      productId
      credit
    }
  }
`;

export const useGetProductConfigQuery = (options?: QueryHookOptions<getProductConfig>) => useQuery(GET_PRODUCT_CONFIG_QUERY, {
  ...options,
  fetchPolicy: 'network-only',
});
