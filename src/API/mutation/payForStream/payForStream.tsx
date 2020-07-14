import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { payForStream, payForStreamVariables } from './__generated__/payForStream';

export const PAY_FOR_STREAM_MUTATION = gql`
  mutation payForStream($id: String!){
    payForStream(id: $id){
      id
      isConsumer
    }
  }
`;

export const usePayForStreamMutation = (options?: MutationHookOptions<payForStream, payForStreamVariables>) => useMutation(PAY_FOR_STREAM_MUTATION, options);
