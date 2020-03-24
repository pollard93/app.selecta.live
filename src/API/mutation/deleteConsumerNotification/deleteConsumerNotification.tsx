/* eslint-disable max-len */
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { deleteConsumerNotification, deleteConsumerNotificationVariables } from './__generated__/deleteConsumerNotification';

export const DELETE_CONSUMER_NOTIFICATION_MUTATION = gql`
  mutation deleteConsumerNotification($id: String!){
    deleteConsumerNotification(id: $id)
  }
`;

export const useDeleteConsumerNotificationMutation = (options?: MutationHookOptions<deleteConsumerNotification, deleteConsumerNotificationVariables>) => useMutation(DELETE_CONSUMER_NOTIFICATION_MUTATION, options);
