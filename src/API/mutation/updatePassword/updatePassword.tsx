import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { updatePasswordVariables, updatePassword } from './__generated__/updatePassword';

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($currentPassword: String!, $newPassword: String!){
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

export const useUpdatePasswordMutation = (options?: MutationHookOptions<updatePassword, updatePasswordVariables>) => useMutation(UPDATE_PASSWORD_MUTATION, options);
