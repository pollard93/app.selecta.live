import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';
import { TAG_PROFILE_FRAGMENT } from './TagProfile';

export const STREAM_SELF_FRAGMENT = gql`
  fragment STREAM_SELF_FRAGMENT on StreamSelf {
    id
    name
    info
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
    streamKey
    streamUrl
    audioOnly
    published
  },
  ${FILE_FRAGMENT}
  ${TAG_PROFILE_FRAGMENT}
`;
