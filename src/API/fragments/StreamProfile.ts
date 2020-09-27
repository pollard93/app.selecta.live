import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';
import { TAG_PROFILE_FRAGMENT } from './TagProfile';

export const STREAM_PROFILE_FRAGMENT_SHORT = gql`
  fragment STREAM_PROFILE_FRAGMENT_SHORT on StreamProfile {
    id
    name
    channel {
      id
      name
      profileImage {
        ...FILE_FRAGMENT
      }
    }
    image {
      ...FILE_FRAGMENT
    }
    timeFrom
    timeFromLive
    timeTo
    timeToLive
    cancelled
    tags {
      ...TAG_PROFILE_FRAGMENT
    }
    position
  },
  ${FILE_FRAGMENT}
  ${TAG_PROFILE_FRAGMENT}
`;

export const STREAM_PROFILE_FRAGMENT = gql`
  fragment STREAM_PROFILE_FRAGMENT on StreamProfile {
    ...STREAM_PROFILE_FRAGMENT_SHORT
    info
    cost
    isConsumer
    audioOnly
    cancelledMessage
  },
  ${STREAM_PROFILE_FRAGMENT_SHORT}
`;
