import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const STREAM_SELF_FRAGMENT = gql`
  fragment STREAM_SELF_FRAGMENT on StreamSelf {
    id
    name
    info
    image {
      ...FILE_FRAGMENT
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
  },
  ${FILE_FRAGMENT}
`;
