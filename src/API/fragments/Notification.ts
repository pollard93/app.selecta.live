import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const NOTIFICATION_FRAGMENT = gql`
  fragment NOTIFICATION_FRAGMENT on NotificationProfile {
    id
    type
    sender {
      id
      profilePicture {
        ...FILE_FRAGMENT
      }
    }
    stream {
      id
    }
    channel {
      id
    }
    readDate
    createdAt
  },
  ${FILE_FRAGMENT}
`;
