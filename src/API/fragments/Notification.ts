import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const NOTIFICATION_FRAGMENT = gql`
  fragment NOTIFICATION_FRAGMENT on NotificationProfile {
    id
    type
    message
    onOpenType
    sender {
      id
      profilePicture {
        ...FILE_FRAGMENT
      }
    }
    stream {
      id
      image {
        ...FILE_FRAGMENT
      }
    }
    channel {
      id
      profileImage {
        ...FILE_FRAGMENT
      }
    }
    readDate
    createdAt
  },
  ${FILE_FRAGMENT}
`;
