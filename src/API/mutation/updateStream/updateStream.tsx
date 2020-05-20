import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { updateStream, updateStreamVariables } from './__generated__/updateStream';
import { STREAM_SELF_FRAGMENT } from '../../fragments/StreamSelf';

export const UPDATE_STREAM_MUTATION = gql`
  mutation updateStream($id: String!, $name: String, $info: String, $timeFrom: DateTime, $timeTo: DateTime, $cost: Int, $image: Upload, $audioOnly: Boolean){
    updateStream(id: $id, name: $name, info: $info, timeFrom: $timeFrom, timeTo: $timeTo, cost: $cost, image: $image, audioOnly: $audioOnly){
      ...STREAM_SELF_FRAGMENT
    }
  },
  ${STREAM_SELF_FRAGMENT}
`;

export const useUpdateStreamMutation = (options?: MutationHookOptions<updateStream, updateStreamVariables>) => useMutation(UPDATE_STREAM_MUTATION, options);
