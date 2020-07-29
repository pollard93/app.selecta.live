import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { requestChannelLoginCodeVariables, requestChannelLoginCode } from './__generated__/requestChannelLoginCode';

export const REQUEST_CHANNEL_LOGIN_MUTATION = gql`
  mutation requestChannelLoginCode($id: String!){
    requestChannelLoginCode(id: $id)
  }
`;

export const useRequestChannelLoginCodeMutation = (options?: MutationHookOptions<requestChannelLoginCode, requestChannelLoginCodeVariables>) => useMutation(REQUEST_CHANNEL_LOGIN_MUTATION, options);
