import gql from 'graphql-tag';

export const CHANNEL_NOTIFICATION_FRAGMENT = gql`
  fragment CHANNEL_NOTIFICATION_FRAGMENT on ChannelNotification {
    id
    type
    readDate
    createdAt
  }
`;
