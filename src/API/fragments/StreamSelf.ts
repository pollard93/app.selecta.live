import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';
import { TAG_PROFILE_FRAGMENT } from './TagProfile';

export const STREAM_SELF_FRAGMENT = gql`
  fragment STREAM_SELF_FRAGMENT on StreamSelf {
    id
    name
    info
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
    tags {
      ...TAG_PROFILE_FRAGMENT
    }
    timeFrom
    timeTo
    cost
    cancelled
    password
    creditRevenuePending
    creditRevenue
    consumersEdge
    liveConsumersEdge
    commentsEdge
    streamKey
    streamUrl
    audioOnly
    published
    viewCount
    position
  },
  ${FILE_FRAGMENT}
  ${TAG_PROFILE_FRAGMENT}
`;
