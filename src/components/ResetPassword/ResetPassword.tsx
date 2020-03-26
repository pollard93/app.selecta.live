import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import SplashScreen from 'react-native-splash-screen';
import ResetPasswordView from './ResetPasswordView';
import { goHome, goToRequireUpdateScreen } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { REMOVE_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeAccessToken/removeAccessTokenMutation';
import { removeAccessToken } from '../../ApolloClient/resolvers/mutation/removeAccessToken/__generated__/removeAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { useResetPasswordMutation } from '../../API/mutation/resetPassword/resetPassword';
import { resetPasswordVariables } from '../../API/mutation/resetPassword/__generated__/resetPassword';

export interface ResetPasswordProps {
  token: string;
}

const ResetPassword = (props: ResetPasswordProps) => {
  const client = useApolloClient();
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
    onError: () => {
      setLoading(false);
      // TODO - toast
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

    SplashScreen.hide();
  }, []);


  /**
   * Form submission
   */
  const onSubmit = (variables: resetPasswordVariables) => {
    setLoading(true);
    resetPasswordMutation({
      variables,
    });
  };


  return (
    <ResetPasswordView
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export default ResetPassword;
