import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { register, registerVariables } from './__generated__/register';

export const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!){
    register(email: $email, password: $password){
      token
    }
  }
`;

export const useRegisterMutation = (options?: MutationHookOptions<register, registerVariables>) => useMutation(REGISTER_MUTATION, options);
