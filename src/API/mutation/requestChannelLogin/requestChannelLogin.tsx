import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { requestChannelLoginVariables, requestChannelLogin } from './__generated__/requestChannelLogin';

export const REQUEST_CHANNEL_LOGIN_MUTATION = gql`
  mutation requestChannelLogin($id: String!){
    requestChannelLogin(id: $id)
  }
`;

export const useRequestChannelLoginMutation = (options?: MutationHookOptions<requestChannelLogin, requestChannelLoginVariables>) => useMutation(REQUEST_CHANNEL_LOGIN_MUTATION, options);
