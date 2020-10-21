import React, { useState, useEffect, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
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
import RequestPasswordResetScreen from '../../screens/RequestPasswordResetScreen/RequestPasswordResetScreen';
import { getGQLErrorMessage } from '../../utils/functions';
import Toast from '../UI/Toast/Toast';
import InAppPurchases from '../../modules/InAppPurchases';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../utils/storage';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../modules/Toast';

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const screenProps = useScreenProps();


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
        dismissible: true,
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
        dismissible: true,
      });
    },
  });


  /**
   * On Mount logout and clear cache, if toast message is passed, then show it
   */
  useEffect(() => {
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
              content="Please check your email"
            />
          ),
          dismissible: true,
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
