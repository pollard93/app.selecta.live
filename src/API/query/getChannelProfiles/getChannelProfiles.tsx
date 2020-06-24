import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { CHANNEL_PROFILE_FRAGMENT_SHORT } from '../../fragments/ChannelProfile';
import { getChannelProfiles, getChannelProfilesVariables } from './__generated__/getChannelProfiles';

export const GET_CHANNEL_PROFILES_QUERY = gql`
  query getChannelProfiles($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
    getChannelProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
      channels {
        ...CHANNEL_PROFILE_FRAGMENT_SHORT
      }
      count
    }
  },
  ${CHANNEL_PROFILE_FRAGMENT_SHORT}
`;

export const useGetChannelProfilesQuery = (options?: QueryHookOptions<getChannelProfiles, getChannelProfilesVariables>) => useQuery(GET_CHANNEL_PROFILES_QUERY, options);
