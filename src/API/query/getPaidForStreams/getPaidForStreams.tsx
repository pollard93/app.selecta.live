import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_PAID_FOR_STREAMS_QUERY = gql`
  query getPaidForStreams($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getPaidForStreams(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
