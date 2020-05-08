import gql from 'graphql-tag';
import { REQUESTED_CHANNEL_FRAGMENT } from '../../fragments/RequestedChannel';

export const GET_REQUESTED_CHANNELS_QUERY = gql`
  query getRequestedChannels($first: Int, $after: String){
    getRequestedChannels(first: $first, after: $after){
      channels {
        ...REQUESTED_CHANNEL_FRAGMENT
      }
      count
    }
  },
  ${REQUESTED_CHANNEL_FRAGMENT}
`;
