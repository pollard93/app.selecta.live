import gql from 'graphql-tag';
import { QueryHookOptions, useLazyQuery } from 'react-apollo';
import { isUsernameUnique } from './__generated__/isUsernameUnique';

export const IS_USERNAME_UNIQUE_QUERY = gql`
  query isUsernameUnique($username: String!){
    isUsernameUnique(username: $username)
  }
`;

export const useIsUsernameUniqueLazyQuery = (options?: QueryHookOptions<isUsernameUnique>) => useLazyQuery(IS_USERNAME_UNIQUE_QUERY, options);
