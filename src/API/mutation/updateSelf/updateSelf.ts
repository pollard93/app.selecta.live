import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { updateSelfVariables, updateSelf } from './__generated__/updateSelf';
import { USER_SELF_FRAGMENT } from '../../fragments/UserSelf';

export const UPDATE_SELF_PROFILE = gql`
  mutation updateSelf($username: String, $profilePicture: Upload){
    updateSelf(username: $username, profilePicture: $profilePicture){
      ...USER_SELF_FRAGMENT
    }
  },
  ${USER_SELF_FRAGMENT}
`;

export const useUpdateSelfMutation = (options?: MutationHookOptions<updateSelf, updateSelfVariables>) => useMutation(UPDATE_SELF_PROFILE, options);
