import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { putStream, putStreamVariables } from './__generated__/putStream';
import { STREAM_SELF_FRAGMENT } from '../../fragments/StreamSelf';

export const PUT_STREAM_MUTATION = gql`
  mutation putStream($name: String!, $info: String!, $timeFrom: DateTime!, $timeTo: DateTime!, $cost: Int!, $image: Upload, $audioOnly: Boolean){
    putStream(name: $name, info: $info, timeFrom: $timeFrom, timeTo: $timeTo, cost: $cost, image: $image, audioOnly: $audioOnly){
      ...STREAM_SELF_FRAGMENT
    }
  },
  ${STREAM_SELF_FRAGMENT}
`;

export const usePutStreamMutation = (options?: MutationHookOptions<putStream, putStreamVariables>) => useMutation(PUT_STREAM_MUTATION, options);
