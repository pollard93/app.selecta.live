/* eslint-disable max-len */
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { readNotification, readNotificationVariables } from './__generated__/readNotification';

export const READ_NOTIFICATION_MUTATION = gql`
  mutation readNotification($id: String!, $unRead: Boolean){
    readNotification(id: $id, unRead: $unRead){
      id
      readDate
    }
  }
`;

export const useReadNotificationMutation = (options?: MutationHookOptions<readNotification, readNotificationVariables>) => useMutation(READ_NOTIFICATION_MUTATION, options);
