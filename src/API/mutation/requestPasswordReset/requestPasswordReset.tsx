import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { requestPasswordResetVariables, requestPasswordReset } from './__generated__/requestPasswordReset';

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation requestPasswordReset($email: String!){
    requestPasswordReset(email: $email)
  }
`;

export const useRequestPasswordResetMutation = (options?: MutationHookOptions<requestPasswordReset, requestPasswordResetVariables>) => useMutation(REQUEST_PASSWORD_RESET_MUTATION, options);
