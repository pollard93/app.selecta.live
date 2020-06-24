import gql from 'graphql-tag';
import { CHANNEL_PROFILE_FRAGMENT } from '../../fragments/ChannelProfile';

export const GET_CHANNEL_PROFILES_QUERY = gql`
  query getChannelProfiles($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
    getChannelProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
      channels {
        ...CHANNEL_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${CHANNEL_PROFILE_FRAGMENT}
`;
