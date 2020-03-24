import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { deleteNotification, deleteNotificationVariables } from './__generated__/deleteNotification';

export const DELETE_NOTIFICATION_MUTATION = gql`
  mutation deleteNotification($id: String!){
    deleteNotification(id: $id)
  }
`;

export const useDeleteNotificationMutation = (options?: MutationHookOptions<deleteNotification, deleteNotificationVariables>) => useMutation(DELETE_NOTIFICATION_MUTATION, options);
