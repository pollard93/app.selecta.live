import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_CHANNEL_STREAM_PROFILES_QUERY = gql`
  query getChannelStreamProfiles($id: String!, $where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getChannelStreamProfiles(id: $id, where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
