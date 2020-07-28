import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { loginChannelWithToken, loginChannelWithTokenVariables } from './__generated__/loginChannelWithToken';

export const LOGIN_CHANNEL_WITH_TOKEN_MUTATION = gql`
  mutation loginChannelWithToken($id: String!){
    loginChannelWithToken(id: $id){
      token
      channel {
        id
      }
    }
  }
`;

export const useLoginChannelWithTokenMutation = (options?: MutationHookOptions<loginChannelWithToken, loginChannelWithTokenVariables>) => useMutation(LOGIN_CHANNEL_WITH_TOKEN_MUTATION, options);
