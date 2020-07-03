import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { STREAM_PROFILE_FRAGMENT_SHORT } from '../../fragments/StreamProfile';
import { getStreamProfiles, getStreamProfilesVariables } from './__generated__/getStreamProfiles';

export const GET_STREAM_PROFILES_QUERY = gql`
  query getStreamProfiles($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
    getStreamProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
      streams {
        ...STREAM_PROFILE_FRAGMENT_SHORT
      }
      count
    }
  },
  ${STREAM_PROFILE_FRAGMENT_SHORT}
`;

export const useGetStreamProfilesQuery = (options?: QueryHookOptions<getStreamProfiles, getStreamProfilesVariables>) => useQuery(GET_STREAM_PROFILES_QUERY, options);
