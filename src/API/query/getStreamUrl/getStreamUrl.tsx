import gql from 'graphql-tag';
import { useQuery, QueryHookOptions, useLazyQuery } from 'react-apollo';
import { getStreamUrl, getStreamUrlVariables } from './__generated__/getStreamUrl';

export const GET_STREAM_URL_QUERY = gql`
  query getStreamUrl($id: String!){
    getStreamUrl(id: $id){
      audio
      video
    }
  }
`;

export const useGetStreamUrlQuery = (options?: QueryHookOptions<getStreamUrl, getStreamUrlVariables>) => useQuery(GET_STREAM_URL_QUERY, options);
export const useGetStreamUrlLazyQuery = (options?: QueryHookOptions<getStreamUrl, getStreamUrlVariables>) => useLazyQuery(GET_STREAM_URL_QUERY, options);
