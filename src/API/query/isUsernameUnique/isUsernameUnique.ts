import gql from 'graphql-tag';
import { QueryHookOptions, useLazyQuery } from 'react-apollo';
import { isUsernameUnique, isUsernameUniqueVariables } from './__generated__/isUsernameUnique';

export const IS_USERNAME_UNIQUE_QUERY = gql`
  query isUsernameUnique($username: String!){
    isUsernameUnique(username: $username)
  }
`;

export const useIsUsernameUniqueLazyQuery = (options?: QueryHookOptions<isUsernameUnique, isUsernameUniqueVariables>) => useLazyQuery(IS_USERNAME_UNIQUE_QUERY, options);
