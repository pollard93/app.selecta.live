import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { unlistStream, unlistStreamVariables } from './__generated__/unlistStream';

export const UNLIST_STREAM_MUTATION = gql`
  mutation unlistStream($id: String!, $list: Boolean){
    unlistStream(id: $id, list: $list){
      id
      unlisted
    }
  }
`;

export const useUnlistStreamMutation = (options?: MutationHookOptions<unlistStream, unlistStreamVariables>) => useMutation(UNLIST_STREAM_MUTATION, options);
