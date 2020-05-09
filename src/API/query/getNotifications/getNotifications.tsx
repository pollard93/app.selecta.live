/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { NOTIFICATION_FRAGMENT } from '../../fragments/Notification';

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications($channelId: String, $first: Int, $after: String){
    getNotifications(channelId: $channelId, first: $first, after: $after){
      notifications {
        ...NOTIFICATION_FRAGMENT,
      }
      count
    }
  },
  ${NOTIFICATION_FRAGMENT}
`;
