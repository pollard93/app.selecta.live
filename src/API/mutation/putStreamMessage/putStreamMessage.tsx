import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { putStreamMessage, putStreamMessageVariables } from './__generated__/putStreamMessage';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';

export const PUT_STREAM_MESSAGE_MUTATION = gql`
  mutation putStreamMessage($id: String!, $message: String!){
    putStreamMessage(id: $id, message: $message){
      ...STREAM_MESSAGE_FRAGMENT
    }
  },
  ${STREAM_MESSAGE_FRAGMENT}
`;

export const usePutStreamMessageMutation = (options?: MutationHookOptions<putStreamMessage, putStreamMessageVariables>) => useMutation(PUT_STREAM_MESSAGE_MUTATION, options);
