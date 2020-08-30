import React, { FC, useState } from 'react';
import { useApolloClient } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { Navigation } from 'react-native-navigation';
import { useRegisterMutation } from '../../API/mutation/register/register';
import RegisterView, { FormData } from './RegisterView';
import { pushScreen, goToRequireUpdateScreen } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { getGQLErrorMessage } from '../../utils/functions';
import Toast from '../UI/Toast/Toast';
import InAppPurchases from '../../modules/InAppPurchases';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../utils/storage';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const screenProps = useScreenProps();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const context = useToast();


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
      PushNotifications.init(getSelf.id);

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
      // Carry on onboarding process
      pushScreen(screenProps.componentId, OnboardingWelcomeScreen, {}).finally(() => {
        setLoading(false);
      });
    },
    onError: (e) => {
      setLoading(false);

      context.push({
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
      getSelfQuery();
    },
    onError: (e) => {
      setLoading(false);

      context.push({
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
   * Form submission
   */
  const onSubmit = (variables: FormData) => {
    setLoading(true);
    registerMutation({
      variables,
    });
  };


  /**
   * Form submission
   */
  const onLogin = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <RegisterView
      onSubmit={onSubmit}
      onLogin={onLogin}
      loading={loading}
    />
  );
};

export default Register;
