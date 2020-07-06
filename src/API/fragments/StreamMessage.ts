import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';
import { USER_PROFILE_FRAGMENT } from './UserProfile';

export const STREAM_MESSAGE_FRAGMENT = gql`
  fragment STREAM_MESSAGE_FRAGMENT on StreamMessageClient {
    id
    user {
      ...USER_PROFILE_FRAGMENT
    }
    message
    createdAt
  },
  ${FILE_FRAGMENT}
  ${USER_PROFILE_FRAGMENT}
`;
