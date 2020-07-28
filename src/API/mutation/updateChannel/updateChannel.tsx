import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { updateChannelVariables, updateChannel } from './__generated__/updateChannel';
import { CHANNEL_SELF_FRAGMENT } from '../../fragments/ChannelSelf';

export const UPDATE_CHANNEL_MUTATION = gql`
  mutation updateChannel($data: ChannelUpdateInput){
    updateChannel(data: $data){
      ...CHANNEL_SELF_FRAGMENT
    }
  },
  ${CHANNEL_SELF_FRAGMENT}
`;

export const useUpdateChannelMutation = (options?: MutationHookOptions<updateChannel, updateChannelVariables>) => useMutation(UPDATE_CHANNEL_MUTATION, options);
