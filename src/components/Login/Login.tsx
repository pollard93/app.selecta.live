import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import LoginView from './LoginView';
import { goHome, pushScreen, goToRequireUpdateScreen } from '../../screens/utils';
import { useLoginMutation } from '../../API/mutation/login/login';
import { useRequestPasswordResetMutation } from '../../API/mutation/requestPasswordReset/requestPasswordReset';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import { RegisterScreenProps, RegisterScreenName } from '../../screens/RegisterScreen/RegisterScreen';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { STACK } from '../../screens/utils/interfaces';

export interface LoginProps {
  toastMessage?: string;
}

const Login = (props: LoginProps) => {
  const client = useApolloClient();
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);


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
      setLoading(false);
      // TODO - toast
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Login mutation, stores access token and executes getSelf on completion
   */
  const [loginMutation] = useLoginMutation({
    onCompleted: async ({ login: { token } }) => {
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
      setLoading(false);
      // TODO - toast
    },
  });


  /**
   * Request password reset mutation
   */
  const [requestPasswordResetMutation] = useRequestPasswordResetMutation({
    onCompleted: () => {
      setLoading(false);
      // TODO - toast
    },
    onError: () => {
      setLoading(false);
      // TODO - toast
    },
  });


  /**
   * On Mount logout and clear cache, if toast message is passed, then show it
   */
  useEffect(() => {
    if (props.toastMessage) {
      // this.context.ref.current.show((
      //   <Toast
      //     type='ERROR'
      //     message={this.props.toastMessage}
      //   />
      // ), 0);
    }

    // Logout after render
    client.mutate<removeAccessToken>({
      mutation: REMOVE_ACCESS_TOKEN_MUTATION,
    });

    SplashScreen.hide();
  }, []);


  /**
   * Form submission
   */
  const onSubmit = async (variables: loginVariables) => {
    setLoading(true);

    if (reset) {
      // Reqiest password reset, will never error
      requestPasswordResetMutation({
        variables: {
          email: variables.email,
        },
      });
      return;
    }

    loginMutation({
      variables,
    });
  };


  /**
   * Navigate to register
   */
  const onRegister = () => {
    pushScreen<RegisterScreenProps>(STACK.LOGIN, {
      component: {
        name: RegisterScreenName,
      },
    });
  };


  return (
    <LoginView
      loading={loading}
      reset={reset}
      onSubmit={onSubmit}
      onReset={() => setReset(true)}
      onRegister={onRegister}
    />
  );
};

export default Login;
