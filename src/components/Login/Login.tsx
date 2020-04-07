import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import { Linking, Platform } from 'react-native';
import jwtDecode from 'jwt-decode';
import Config from 'react-native-config';
import { useToast } from 'mbp-components-rn-toast';
import LoginView from './LoginView';
import { goHome, pushScreen, goToRequireUpdateScreen } from '../../screens/utils';
import { useLoginMutation } from '../../API/mutation/login/login';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import { RegisterScreenProps, RegisterScreenName } from '../../screens/RegisterScreen/RegisterScreen';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { STACK } from '../../screens/utils/interfaces';
import { ResetPasswordScreenProps, ResetPasswordScreenName } from '../../screens/ResetPasswordScreen/ResetPasswordScreen';
import { RequestPasswordResetScreenName } from '../../screens/RequestResetPasswordScreen/RequestResetPasswordScreen';
import { getGQLErrorMessage } from '../../utils/functions';
import Toast from '../UI/Toast/Toast';
import InAppPurchases from '../../modules/InAppPurchases';

export interface LoginProps {
  toastMessage?: string;
}

const Login = (props: LoginProps) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const context = useToast();


  /**
   * Reset password deep linking
   * Listens for live.selecta.app.consumer://reset-password/${token}
   * Pushes ResetPasswordScreen with token
   */
  useEffect(() => {
    const onOpen = (event: {url: string}) => {
      try {
        const uri = event.url.replace(Config.REACT_APP_DEEP_LINKING_BASE_URL, '');
        if (uri.startsWith('reset-password')) {
          /**
           * Get token and check the expiry is not within 5 minutes
           */
          const token = uri.replace('reset-password/', '');
          const { exp } = jwtDecode(token);
          if (new Date(exp * 1000) <= new Date(Date.now() - 30000)) {
            context.push({
              duration: 1000,
              component: (
                <Toast content="Link has expired" />
              ),
              dismissible: false,
            });
            return;
          }

          /**
           * Push resetPasswordScreen
           */
          pushScreen<ResetPasswordScreenProps>(STACK.LOGIN, {
            component: {
              name: ResetPasswordScreenName,
              passProps: {
                token,
              },
            },
          });
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };


    /**
     * Handle Android
     */
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        onOpen({ url });
      });
      return undefined;
    }


    /**
     * Handle iOS
     */
    Linking.addEventListener('url', onOpen);
    return () => Linking.removeEventListener('url', onOpen);
  }, []);


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
   * On Mount logout and clear cache, if toast message is passed, then show it
   */
  useEffect(() => {
    if (props.toastMessage) {
      context.push({
        duration: 1000,
        component: (
          <Toast content={props.toastMessage} />
        ),
        dismissible: false,
      });
    }

    // Logout after render
    client.mutate<removeAccessToken>({
      mutation: REMOVE_ACCESS_TOKEN_MUTATION,
    });

    // Disconnect push notifications and in app purchases
    PushNotifications.disconnect();
    InAppPurchases.disconnect();

    // Hide splash screen
    SplashScreen.hide();
  }, []);


  /**
   * Form submission
   */
  const onSubmit = (variables: loginVariables) => {
    setLoading(true);
    loginMutation({
      variables,
    });
  };


  /**
   * Navigate to RequestPasswordResetScreen
   */
  const onReset = () => {
    pushScreen(STACK.LOGIN, {
      component: {
        name: RequestPasswordResetScreenName,
      },
    });
  };


  /**
   * Navigate to RegisterScreen
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
      onSubmit={onSubmit}
      onReset={onReset}
      onRegister={onRegister}
    />
  );
};

export default Login;
