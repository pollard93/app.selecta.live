import gql from 'graphql-tag';
import { useLazyQuery, useQuery, QueryHookOptions } from 'react-apollo';
import { getSelf } from './__generated__/getSelf';
import { USER_SELF_FRAGMENT } from '../../fragments/UserSelf';

export const GET_SELF_QUERY = gql`
  query getSelf {
    getSelf {
      ...USER_SELF_FRAGMENT
    }
  },
  ${USER_SELF_FRAGMENT}
`;

export const GET_SELF_UNREAD_NOTIFICATION_COUNT_QUERY = gql`
  query getSelf {
    getSelf {
      id
      unreadNotificationCount
    }
  }
`;

export const useGetSelfQuery = (options?: QueryHookOptions<getSelf>) => useQuery(GET_SELF_QUERY, options);
export const useGetSelfLazyQuery = (options?: QueryHookOptions<getSelf>) => useLazyQuery(GET_SELF_QUERY, options);

/**
 * Utility to return cached data
 */
export const useGetSelf = () => {
  const { data: { getSelf: self } } = useGetSelfQuery();
  return self;
};
