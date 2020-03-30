import gql from 'graphql-tag';
import { CHANNEL_PROFILE_FRAGMENT } from '../../fragments/ChannelProfile';

export const SEARCH_CHANNELS_QUERY = gql`
  query searchChannels($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
    searchChannels(where: $where, first: $first, after: $after, orderBy: $orderBy){
      channels {
        ...CHANNEL_PROFILE_FRAGMENT
      }
      count
    }
  },
  ${CHANNEL_PROFILE_FRAGMENT}
`;
