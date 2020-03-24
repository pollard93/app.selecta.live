/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { CONSUMER_NOTIFICATION_FRAGMENT } from '../../fragments/ConsumerNotification';

export const CONSUMER_NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription consumerNotifications {
    consumerNotifications {
      mutation
      updatedFields
      node {
        ...CONSUMER_NOTIFICATION_FRAGMENT
      }
    }
  },
  ${CONSUMER_NOTIFICATION_FRAGMENT}
`;
