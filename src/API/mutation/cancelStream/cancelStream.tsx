import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { cancelStream, cancelStreamVariables } from './__generated__/cancelStream';

export const CANCEL_STREAM_MUTATION = gql`
  mutation cancelStream($id: String!){
    cancelStream(id: $id){
      id
      cancelled
    }
  }
`;

export const useCancelStreamMutation = (options?: MutationHookOptions<cancelStream, cancelStreamVariables>) => useMutation(CANCEL_STREAM_MUTATION, options);
