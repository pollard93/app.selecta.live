import gql from 'graphql-tag';
import { CHANNEL_SELF_FRAGMENT } from '../../fragments/ChannelSelf';

export const GET_CHANNEL_SELFS_QUERY = gql`
  query getChannelSelfs($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
    getChannelSelfs(where: $where, first: $first, after: $after, orderBy: $orderBy){
      channels {
        ...CHANNEL_SELF_FRAGMENT
      }
      count
    }
  },
  ${CHANNEL_SELF_FRAGMENT}
`;
