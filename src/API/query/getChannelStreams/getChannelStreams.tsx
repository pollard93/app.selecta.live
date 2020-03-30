import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_CHANNEL_STREAMS_QUERY = gql`
  query getChannelStreams($id: String!, $first: Int, $after: String){
    getChannelStreams(id: $id, first: $first, after: $after){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
