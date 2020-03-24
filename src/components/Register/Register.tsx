import React, { FunctionComponent } from 'react';
import { useApolloClient } from 'react-apollo';
import { useRegisterMutation } from '../../API/mutation/register/register';
import RegisterView from './RegisterView';
import { registerVariables } from '../../API/mutation/register/__generated__/register';
import { goHome, goToRequireUpdateScreen } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';

export interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const client = useApolloClient();


  /**
   * Get self query, binds notifications and navigates home on completion
   */
  const [getSelf] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: { id, requiresUpdate } }) => {
      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      // Bind notifications
      PushNotifications.init(id);

      // Navigate to home now getSelf is cached
      goHome();
    },
    onError: () => {
      // TODO - toast
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Register mutation, stores access token and executes getSelf on completion
   */
  const [registerMutation, { loading }] = useRegisterMutation({
    onCompleted: async ({ register: { token } }) => {
      // Store token
      await client.mutate<putAccessToken, putAccessTokenVariables>({
        mutation: PUT_ACCESS_TOKEN_MUTATION,
        variables: {
          token,
        },
      });

      // Execute getSelf to cache it
      getSelf();
    },
    onError: () => {
      // TODO - toast
    },
  });


  /**
   * Form submission
   */
  const onSubmit = async (variables: registerVariables) => {
    registerMutation({
      variables,
    });
  };


  return (
    <RegisterView
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default Register;
