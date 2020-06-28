import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const CHANNEL_PROFILE_FRAGMENT_SHORT = gql`
  fragment CHANNEL_PROFILE_FRAGMENT_SHORT on ChannelProfile {
    id
    name
    profileImage {
      ...FILE_FRAGMENT
    }
  },
  ${FILE_FRAGMENT}
`;

export const CHANNEL_PROFILE_FRAGMENT = gql`
  fragment CHANNEL_PROFILE_FRAGMENT on ChannelProfile {
    id
    name
    description
    coverImage {
      ...FILE_FRAGMENT
    }
    profileImage {
      ...FILE_FRAGMENT
    }
    following
    followersEdge
  },
  ${FILE_FRAGMENT}
`;
