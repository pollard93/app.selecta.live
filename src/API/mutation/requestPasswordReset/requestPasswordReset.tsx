import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { requestPasswordResetVariables, requestPasswordReset } from './__generated__/requestPasswordReset';
import { LOGIN_MUTATION } from '../login/login';

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation requestPasswordReset($email: String!){
    requestPasswordReset(email: $email)
  }
`;

export const useRequestPasswordResetMutation = (options?: MutationHookOptions<requestPasswordReset, requestPasswordResetVariables>) => useMutation(LOGIN_MUTATION, options);
