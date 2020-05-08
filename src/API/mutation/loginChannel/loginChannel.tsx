import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { loginChannel, loginChannelVariables } from './__generated__/loginChannel';

export const LOGIN_CHANNEL_MUTATION = gql`
  mutation loginChannel($id: String!, $code: String!){
    loginChannel(id: $id, code: $code){
      token
    }
  }
`;

export const useLoginChannelMutation = (options?: MutationHookOptions<loginChannel, loginChannelVariables>) => useMutation(LOGIN_CHANNEL_MUTATION, options);
