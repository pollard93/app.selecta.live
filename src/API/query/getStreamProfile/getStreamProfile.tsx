import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from 'react-apollo';
import { getStreamProfile, getStreamProfileVariables } from './__generated__/getStreamProfile';
import { STREAM_PROFILE_FRAGMENT } from '../../fragments/StreamProfile';

export const GET_STREAM_PROFILE_QUERY = gql`
  query getStreamProfile($id: String!){
    getStreamProfile(id: $id){
      ...STREAM_PROFILE_FRAGMENT
    }
  },
  ${STREAM_PROFILE_FRAGMENT}
`;

export const useGetStreamProfileQuery = (options?: QueryHookOptions<getStreamProfile, getStreamProfileVariables>) => useQuery(GET_STREAM_PROFILE_QUERY, options);
