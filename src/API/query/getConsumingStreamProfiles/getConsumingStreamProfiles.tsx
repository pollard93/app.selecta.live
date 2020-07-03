import gql from 'graphql-tag';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_CONSUMING_STREAM_PROFILES = gql`
  query getConsumingStreamProfiles($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getConsumingStreamProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;
