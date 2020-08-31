import gql from 'graphql-tag';
import { useLazyQuery, QueryHookOptions } from 'react-apollo';
import { verifyUser } from './__generated__/verifyUser';

export const VERIFY_USER_QUERY = gql`
  query verifyUser {
    verifyUser
  }
`;

export const useVerifyUserLazyQuery = (options?: QueryHookOptions<verifyUser>) => useLazyQuery(VERIFY_USER_QUERY, options);
