import gql from 'graphql-tag';
import { USER_PROFILE_FRAGMENT } from './UserProfile';

export const STREAM_COMMENT_FRAGMENT = gql`
  fragment STREAM_COMMENT_FRAGMENT on StreamCommentClient {
    id
    user {
      ...USER_PROFILE_FRAGMENT
    }
    comment
    createdAt
  },
  ${USER_PROFILE_FRAGMENT}
`;
