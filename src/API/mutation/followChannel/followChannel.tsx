import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { followChannel, followChannelVariables } from './__generated__/followChannel';

export const FOLLOW_CHANNEL_MUTATION = gql`
  mutation followChannel($id: String!, $unfollow: Boolean){
    followChannel(id: $id, unfollow: $unfollow){
      id
      following
      followersEdge
    }
  }
`;

export const useFollowChannelMutation = (options?: MutationHookOptions<followChannel, followChannelVariables>) => useMutation(FOLLOW_CHANNEL_MUTATION, options);
