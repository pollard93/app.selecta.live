/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { CONSUMER_NOTIFICATION_FRAGMENT } from '../../fragments/ConsumerNotification';

export const GET_CONSUMER_NOTIFICATIONS_QUERY = gql`
  query getConsumerNotifications($first: Int, $after: String){
    getConsumerNotifications(first: $first, after: $after){
      notifications {
        ...CONSUMER_NOTIFICATION_FRAGMENT,
      }
      count
    }
  },
  ${CONSUMER_NOTIFICATION_FRAGMENT}
`;
