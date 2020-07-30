import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { deleteStream, deleteStreamVariables } from './__generated__/deleteStream';

export const DELETE_STREAM_MUTATION = gql`
  mutation deleteStream($id: String!){
    deleteStream(id: $id)
  }
`;

export const useDeleteStreamMutation = (options?: MutationHookOptions<deleteStream, deleteStreamVariables>) => useMutation(DELETE_STREAM_MUTATION, options);
