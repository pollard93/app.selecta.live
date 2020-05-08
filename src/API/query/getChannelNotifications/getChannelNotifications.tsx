/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { CHANNEL_NOTIFICATION_FRAGMENT } from '../../fragments/ChannelNotification';

export const GET_CHANNEL_NOTIFICATIONS_QUERY = gql`
  query getChannelNotifications($first: Int, $after: String){
    getChannelNotifications(first: $first, after: $after){
      notifications {
        ...CHANNEL_NOTIFICATION_FRAGMENT,
      }
      count
    }
  },
  ${CHANNEL_NOTIFICATION_FRAGMENT}
`;
