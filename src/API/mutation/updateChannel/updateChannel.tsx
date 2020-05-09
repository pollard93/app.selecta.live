import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { updateChannelVariables, updateChannel } from './__generated__/updateChannel';
import { CHANNEL_SELF_FRAGMENT } from '../../fragments/ChannelSelf';

export const UPDATE_CHANNEL_MUTATION = gql`
  mutation updateChannel($name: String, $description: String, $profileImage: Upload, $coverImage: Upload){
    updateChannel(name: $name, description: $description, profileImage: $profileImage, coverImage: $coverImage){
      ...CHANNEL_SELF_FRAGMENT
    }
  },
  ${CHANNEL_SELF_FRAGMENT}
`;

export const useUpdateChannelMutation = (options?: MutationHookOptions<updateChannel, updateChannelVariables>) => useMutation(UPDATE_CHANNEL_MUTATION, options);
