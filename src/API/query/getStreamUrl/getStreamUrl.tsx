import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from 'react-apollo';
import { getStreamUrl } from './__generated__/getStreamUrl';

export const GET_STREAM_URL_QUERY = gql`
  query getStreamUrl($id: String!){
    getStreamUrl(id: $id)
  }
`;

export const useGetStreamUrlQuery = (options?: QueryHookOptions<getStreamUrl>) => useQuery(GET_STREAM_URL_QUERY, options);
