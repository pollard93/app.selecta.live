import gql from 'graphql-tag';
import { useQuery, QueryHookOptions, useLazyQuery } from 'react-apollo';
import { getStreamSelf, getStreamSelfVariables } from './__generated__/getStreamSelf';
import { STREAM_SELF_FRAGMENT } from '../../fragments/StreamSelf';

export const GET_STREAM_SELF_QUERY = gql`
  query getStreamSelf($id: String!){
    getStreamSelf(id: $id){
      ...STREAM_SELF_FRAGMENT
    }
  },
  ${STREAM_SELF_FRAGMENT}
`;

export const useGetStreamSelfQuery = (options?: QueryHookOptions<getStreamSelf, getStreamSelfVariables>) => useQuery(GET_STREAM_SELF_QUERY, options);
export const useGetStreamSelfLazyQuery = (options?: QueryHookOptions<getStreamSelf, getStreamSelfVariables>) => useLazyQuery(GET_STREAM_SELF_QUERY, options);
