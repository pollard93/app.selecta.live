import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { registerChannel, registerChannelVariables } from './__generated__/registerChannel';
import { REQUESTED_CHANNEL_FRAGMENT } from '../../fragments/RequestedChannel';

export const REGISTER_CHANNEL_MUTATION = gql`
  mutation registerChannel($name: String!, $description: String!){
    registerChannel(name: $name, description: $description){
      ...REQUESTED_CHANNEL_FRAGMENT
    }
  },
  ${REQUESTED_CHANNEL_FRAGMENT}
`;

export const useRegisterChannelMutation = (options?: MutationHookOptions<registerChannel, registerChannelVariables>) => useMutation(REGISTER_CHANNEL_MUTATION, options);
