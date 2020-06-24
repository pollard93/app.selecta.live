import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const STREAM_PROFILE_FRAGMENT_SHORT = gql`
  fragment STREAM_PROFILE_FRAGMENT_SHORT on StreamProfile {
    id
    name
    channel {
      name
    }
    image {
      ...FILE_FRAGMENT
    }
    timeFrom
    isConsumer
    audioOnly
    position
  },
  ${FILE_FRAGMENT}
`;

export const STREAM_PROFILE_FRAGMENT = gql`
  fragment STREAM_PROFILE_FRAGMENT on StreamProfile {
    id
    channel {
      name
    }
    name
    image {
      ...FILE_FRAGMENT
    }
    isConsumer
    audioOnly
    position
  },
  ${FILE_FRAGMENT}
`;
