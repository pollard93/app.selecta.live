import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const CONSUMER_NOTIFICATION_FRAGMENT = gql`
  fragment CONSUMER_NOTIFICATION_FRAGMENT on ConsumerNotification {
    id
    type
    sender {
      id
      profilePicture {
        ...FILE_FRAGMENT
      }
    }
    readDate
    createdAt
  },
  ${FILE_FRAGMENT}
`;
