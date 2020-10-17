import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { register, registerVariables } from './__generated__/register';

export const REGISTER_MUTATION = gql`
  mutation register($data: RegisterInput){
    register(data: $data){
      token
    }
  }
`;

export const useRegisterMutation = (options?: MutationHookOptions<register, registerVariables>) => useMutation(REGISTER_MUTATION, options);
