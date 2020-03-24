import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { loginWithSocial } from './__generated__/loginWithSocial';

export const LOGIN_WITH_SOCIAL_MUTATION = gql`
  mutation loginWithSocial($provider: SOCIAL_PROVIDER!){
    loginWithSocial(provider: $provider){
      token
    }
  }
`;

export const useLoginWithSocialMutation = (options?: MutationHookOptions<loginWithSocial>) => useMutation(LOGIN_WITH_SOCIAL_MUTATION, options);
