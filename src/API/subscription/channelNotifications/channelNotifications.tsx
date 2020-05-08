/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { CHANNEL_NOTIFICATION_FRAGMENT } from '../../fragments/ChannelNotification';

export const CHANNEL_NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription channelNotifications {
    channelNotifications {
      mutation
      updatedFields
      node {
        ...CHANNEL_NOTIFICATION_FRAGMENT
      }
    }
  },
  ${CHANNEL_NOTIFICATION_FRAGMENT}
`;
