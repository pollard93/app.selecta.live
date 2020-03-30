import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const SEARCH_STREAMS_QUERY = gql`
  query searchStreams($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    searchStreams(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
