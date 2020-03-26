import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { resetPasswordVariables, resetPassword } from './__generated__/resetPassword';

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation resetPassword($password: String!){
    resetPassword(password: $password){
      token
    }
  }
`;

export const useResetPasswordMutation = (options?: MutationHookOptions<resetPassword, resetPasswordVariables>) => useMutation(REQUEST_PASSWORD_RESET_MUTATION, options);
