import React, { FunctionComponent, useState } from 'react';
import { useApolloClient } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { useRegisterMutation } from '../../API/mutation/register/register';
import RegisterView from './RegisterView';
import { registerVariables } from '../../API/mutation/register/__generated__/register';
import { goHome, goToRequireUpdateScreen } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { getGQLErrorMessage } from '../../utils/functions';
import Toast from '../UI/Toast/Toast';

export interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const context = useToast();


  /**
   * Get self query, binds notifications and navigates home on completion
   */
  const [getSelf] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: { id, requiresUpdate } }) => {
      // Bind notifications
      PushNotifications.init(id);

      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      // Navigate to home now getSelf is cached
      goHome();
    },
    onError: (e) => {
      setLoading(false);

      context.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Register mutation, stores access token and executes getSelf on completion
   */
  const [registerMutation] = useRegisterMutation({
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
    onError: (e) => {
      setLoading(false);

      context.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Form submission
   */
  const onSubmit = (variables: registerVariables) => {
    setLoading(true);
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
