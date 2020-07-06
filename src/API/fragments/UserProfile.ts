import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const USER_PROFILE_FRAGMENT = gql`
  fragment USER_PROFILE_FRAGMENT on UserProfile {
    id
    username
    profilePicture {
      ...FILE_FRAGMENT
    }
  },
  ${FILE_FRAGMENT}
`;
