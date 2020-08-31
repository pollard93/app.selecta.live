import React, { useState, useEffect, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import { Linking } from 'react-native';
import jwtDecode from 'jwt-decode';
import Config from 'react-native-config';
import LoginView from './LoginView';
import { goHome, goToRequireUpdateScreen, pushScreen } from '../../screens/utils';
import { useLoginMutation } from '../../API/mutation/login/login';
import { loginVariables } from '../../API/mutation/login/__generated__/login';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen/ResetPasswordScreen';
import RequestPasswordResetScreen from '../../screens/RequestPasswordResetScreen/RequestPasswordResetScreen';
import { getGQLErrorMessage } from '../../utils/functions';
import Toast from '../UI/Toast/Toast';
import InAppPurchases from '../../modules/InAppPurchases';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../utils/storage';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../modules/Toast';

export interface LoginProps {
  toastMessage?: string;
}

const Login: FC<LoginProps> = (props) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const screenProps = useScreenProps();


  /**
   * Reset password deep linking
   * Listens for live.selecta.app://reset-password/${token}
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
            pushToast({
              duration: 1000,
              component: (
                <Toast
                  type="ERROR"
                  content="Link has expired"
                />
              ),
              dismissible: false,
            });
            return;
          }

          /**
           * Push resetPasswordScreen
           */
          pushScreen(screenProps.componentId, ResetPasswordScreen, { token });
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };


    /**
     * Handle iOS
     */
    Linking.addEventListener('url', onOpen);
    return () => Linking.removeEventListener('url', onOpen);
  }, []);


  /**
   * Get self query, binds notifications and navigates home on completion
   */
  const [getSelfQuery] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf }) => {
      /**
       * Store result in async storage
       */
      await store('getSelf', getSelf);

      // Bind notifications
      // Prompt now if user has a username as they will not be going to the onboarding process
      PushNotifications.init(getSelf.id, !!getSelf.username);

      // Bind in app purchases
      InAppPurchases.init();

      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (getSelf.requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      // Navigate now getSelf is cached
      if (!getSelf.username) {
        // Carry on onboarding process if user has no username
        pushScreen(screenProps.componentId, OnboardingWelcomeScreen, {}).finally(() => {
          setLoading(false);
        });
      } else {
        // Go home if username is set
        goHome();
      }
    },
    onError: (e) => {
      setLoading(false);

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
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
      getSelfQuery();
    },
    onError: (e) => {
      setLoading(false);

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
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
      pushToast({
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
  const onReset = (defaultEmailValue: string) => {
    pushScreen(screenProps.componentId, RequestPasswordResetScreen, {
      defaultEmailValue,
      onCompletion: () => {
        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="SUCCESS"
              content="Please open your magic link in the email we have just sent you"
            />
          ),
          dismissible: false,
        });
      },
    });
  };


  /**
   * Navigate to RegisterScreen
   */
  const onRegister = () => {
    pushScreen(screenProps.componentId, RegisterScreen, {});
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
