import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from 'react-apollo';
import { getChannelProfile } from './__generated__/getChannelProfile';
import { CHANNEL_PROFILE_FRAGMENT } from '../../fragments/ChannelProfile';

export const GET_CHANNEL_PROFILE_QUERY = gql`
  query getChannelProfile($id: String!){
    getChannelProfile(id: $id){
      ...CHANNEL_PROFILE_FRAGMENT
    }
  },
  ${CHANNEL_PROFILE_FRAGMENT}
`;

export const useGetChannelProfileQuery = (options?: QueryHookOptions<getChannelProfile>) => useQuery(GET_CHANNEL_PROFILE_QUERY, options);
