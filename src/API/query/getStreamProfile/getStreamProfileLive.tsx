import gql from 'graphql-tag';
import { QueryHookOptions, useLazyQuery } from 'react-apollo';
import { getStreamProfileLive, getStreamProfileLiveVariables } from './__generated__/getStreamProfileLive';

export const GET_STREAM_PROFILE_LIVE_QUERY = gql`
  query getStreamProfileLive($id: String!){
    getStreamProfile(id: $id){
      id
      timeFromLive
      timeToLive
    }
  }
`;

export const useGetStreamProfileLiveLazyQuery = (options?: QueryHookOptions<getStreamProfileLive, getStreamProfileLiveVariables>) => useLazyQuery(GET_STREAM_PROFILE_LIVE_QUERY, options);
