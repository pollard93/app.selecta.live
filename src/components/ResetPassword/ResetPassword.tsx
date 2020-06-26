import React, { useState, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import { Navigation } from 'react-native-navigation';
import ResetPasswordView from './ResetPasswordView';
import { goHome, goToRequireUpdateScreen, pushScreenV2 } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { useResetPasswordMutation } from '../../API/mutation/resetPassword/resetPassword';
import Toast from '../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import { STACK, ScreenProps } from '../../screens/utils/interfaces';
import { FormData } from '../Register/RegisterView';
import OnboardingWelcomeScreen from '../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';

export interface ResetPasswordProps extends ScreenProps {
  token: string;
}

const ResetPassword: FC<ResetPasswordProps> = (props) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const context = useToast();


  /**
   * Get self query, binds notifications and navigates home on completion
   */
  const [getSelf] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: getSelfData }) => {
      const { id, name, requiresUpdate } = getSelfData;

      // Bind notifications
      PushNotifications.init(id);

      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      // Navigate now getSelf is cached
      if (!name) {
        // Carry on onboarding process if user has no name
        pushScreenV2(STACK.ONBOARDING, OnboardingWelcomeScreen, {}).finally(() => {
          setLoading(false);
        });
      } else {
        // Go home if name is set
        goHome();
      }
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
   * ResetPassword mutation, stores access token and executes getSelf on completion
   */
  const [resetPasswordMutation] = useResetPasswordMutation({
    context: {
      headers: {
        authorization: props.token,
      },
    },
    onCompleted: async ({ resetPassword: { token } }) => {
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
    resetPasswordMutation({
      variables,
    });
  };


  /**
   * Pop this screen
   */
  const onPop = () => {
    Navigation.pop(props.componentId);
  };


  return (
    <ResetPasswordView
      loading={loading}
      onSubmit={onSubmit}
      onPop={onPop}
    />
  );
};

export default ResetPassword;
