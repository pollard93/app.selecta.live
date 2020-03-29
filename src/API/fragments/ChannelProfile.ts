import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const CHANNEL_PROFILE_FRAGMENT = gql`
  fragment CHANNEL_PROFILE_FRAGMENT on ChannelProfile {
    id
    name
    profileImage {
      ...FILE_FRAGMENT
    }
  },
  ${FILE_FRAGMENT}
`;
