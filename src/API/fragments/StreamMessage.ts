import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const STREAM_MESSAGE_FRAGMENT = gql`
  fragment STREAM_MESSAGE_FRAGMENT on StreamMessageClient {
    id
    user {
      id
      profilePicture {
        ...FILE_FRAGMENT
      }
    }
    message
    createdAt
  },
  ${FILE_FRAGMENT}
`;
