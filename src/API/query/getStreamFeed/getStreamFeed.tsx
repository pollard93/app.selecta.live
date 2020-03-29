import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_STREAM_FEED_QUERY = gql`
  query getStreamFeed($first: Int, $after: String){
    getStreamFeed(first: $first, after: $after){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
