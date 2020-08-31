import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { updateEmailVariables, updateEmail } from './__generated__/updateEmail';

export const UPDATE_EMAIL_MUTATION = gql`
  mutation updateEmail($email: String!, $password: String!){
    updateEmail(email: $email, password: $password)
  }
`;

export const useUpdateEmailMutation = (options?: MutationHookOptions<updateEmail, updateEmailVariables>) => useMutation(UPDATE_EMAIL_MUTATION, options);
