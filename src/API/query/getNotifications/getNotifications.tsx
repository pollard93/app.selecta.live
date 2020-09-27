/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { NOTIFICATION_FRAGMENT } from '../../fragments/Notification';
import { getNotifications } from './__generated__/getNotifications';

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications($first: Int, $after: String){
    getNotifications(first: $first, after: $after){
      notifications {
        ...NOTIFICATION_FRAGMENT,
      }
      count
    }
  },
  ${NOTIFICATION_FRAGMENT}
`;

export const useGetNotificationsQuery = (options?: QueryHookOptions<getNotifications, getNotificationsVariables>) => useQuery(GET_NOTIFICATIONS_QUERY, options);
