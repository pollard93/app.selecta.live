/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { NOTIFICATION_FRAGMENT } from '../../fragments/Notification';

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription notifications {
    notifications {
      mutation
      updatedFields
      node {
        ...NOTIFICATION_FRAGMENT
      }
    }
  },
  ${NOTIFICATION_FRAGMENT}
`;
