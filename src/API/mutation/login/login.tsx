import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { login, loginVariables } from './__generated__/login';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
      token
    }
  }
`;

export const useLoginMutation = (options?: MutationHookOptions<login, loginVariables>) => useMutation(LOGIN_MUTATION, options);
