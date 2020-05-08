/* eslint-disable max-len */
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { readChannelNotification, readChannelNotificationVariables } from './__generated__/readChannelNotification';

export const READ_CHANNEL_NOTIFICATION_MUTATION = gql`
  mutation readChannelNotification($id: String!, $unRead: Boolean){
    readChannelNotification(id: $id, unRead: $unRead){
      id
      readDate
    }
  }
`;

export const useReadChannelNotificationMutation = (options?: MutationHookOptions<readChannelNotification, readChannelNotificationVariables>) => useMutation(READ_CHANNEL_NOTIFICATION_MUTATION, options);
