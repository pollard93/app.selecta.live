import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const USER_SELF_FRAGMENT = gql`
  fragment USER_SELF_FRAGMENT on UserSelf {
    id
    name
    email
    credit
    profilePicture {
      ...FILE_FRAGMENT
    }
    unreadNotificationCount
    requiresUpdate {
      appStoreUrl
      playStoreUrl
    }
  },
  ${FILE_FRAGMENT}
`;
