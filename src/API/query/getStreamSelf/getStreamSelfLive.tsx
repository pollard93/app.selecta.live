import gql from 'graphql-tag';
import { QueryHookOptions, useLazyQuery } from 'react-apollo';
import { getStreamSelfLive, getStreamSelfLiveVariables } from './__generated__/getStreamSelfLive';

export const GET_STREAM_SELF_LIVE_QUERY = gql`
  query getStreamSelfLive($id: String!){
    getStreamSelf(id: $id){
      id
      liveConsumersEdge
    }
  }
`;

export const useGetStreamSelfLiveLazyQuery = (options?: QueryHookOptions<getStreamSelfLive, getStreamSelfLiveVariables>) => useLazyQuery(GET_STREAM_SELF_LIVE_QUERY, options);
