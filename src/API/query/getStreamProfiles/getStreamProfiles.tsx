import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_STREAM_PROFILES_QUERY = gql`
  query getStreamProfiles($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getStreamProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
