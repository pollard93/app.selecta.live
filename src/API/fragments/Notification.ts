import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const NOTIFICATION_FRAGMENT = gql`
  fragment NOTIFICATION_FRAGMENT on Notification {
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
