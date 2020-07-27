import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { loginChannelWithCode, loginChannelWithCodeVariables } from './__generated__/loginChannelWithCode';

export const LOGIN_CHANNEL_WITH_CODE_MUTATION = gql`
  mutation loginChannelWithCode($id: String!, $code: String!){
    loginChannelWithCode(id: $id, code: $code){
      token
    }
  }
`;

export const useLoginChannelWithCodeMutation = (options?: MutationHookOptions<loginChannelWithCode, loginChannelWithCodeVariables>) => useMutation(LOGIN_CHANNEL_WITH_CODE_MUTATION, options);
