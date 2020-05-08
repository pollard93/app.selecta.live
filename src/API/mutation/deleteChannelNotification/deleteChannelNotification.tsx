/* eslint-disable max-len */
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { deleteChannelNotification, deleteChannelNotificationVariables } from './__generated__/deleteChannelNotification';

export const DELETE_CHANNEL_NOTIFICATION_MUTATION = gql`
  mutation deleteChannelNotification($id: String!){
    deleteChannelNotification(id: $id)
  }
`;

export const useDeleteChannelNotificationMutation = (options?: MutationHookOptions<deleteChannelNotification, deleteChannelNotificationVariables>) => useMutation(DELETE_CHANNEL_NOTIFICATION_MUTATION, options);
