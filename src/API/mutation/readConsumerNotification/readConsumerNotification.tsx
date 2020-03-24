/* eslint-disable max-len */
import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { readConsumerNotification, readConsumerNotificationVariables } from './__generated__/readConsumerNotification';

export const READ_CONSUMER_NOTIFICATION_MUTATION = gql`
  mutation readConsumerNotification($id: String!, $unRead: Boolean){
    readConsumerNotification(id: $id, unRead: $unRead){
      id
      readDate
    }
  }
`;

export const useReadConsumerNotificationMutation = (options?: MutationHookOptions<readConsumerNotification, readConsumerNotificationVariables>) => useMutation(READ_CONSUMER_NOTIFICATION_MUTATION, options);
