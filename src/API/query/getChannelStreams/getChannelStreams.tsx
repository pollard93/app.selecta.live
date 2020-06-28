import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_CHANNEL_STREAMS_QUERY = gql`
  query getChannelStreams($id: String!, $where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getChannelStreams(id: $id, where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
