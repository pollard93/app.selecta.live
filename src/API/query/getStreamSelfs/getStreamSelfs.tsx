import gql from 'graphql-tag';
import { STREAM_SELF_FRAGMENT } from '../../fragments/StreamSelf';

export const GET_STREAM_SELFS_QUERY = gql`
  query getStreamSelfs($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getStreamSelfs(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_SELF_FRAGMENT
      }
      count
    }
  },
  ${STREAM_SELF_FRAGMENT}
`;
