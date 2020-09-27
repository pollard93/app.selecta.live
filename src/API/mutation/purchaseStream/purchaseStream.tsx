import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { purchaseStream, purchaseStreamVariables } from './__generated__/purchaseStream';

export const PURCHASE_STREAM_MUTATION = gql`
  mutation purchaseStream($id: String!){
    purchaseStream(id: $id){
      id
      isConsumer
    }
  }
`;

export const usePurchaseStreamMutation = (options?: MutationHookOptions<purchaseStream, purchaseStreamVariables>) => useMutation(PURCHASE_STREAM_MUTATION, options);
