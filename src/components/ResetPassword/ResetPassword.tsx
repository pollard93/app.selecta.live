import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo';
import { useToast } from 'mbp-components-rn-toast';
import ResetPasswordView from './ResetPasswordView';
import { goHome, goToRequireUpdateScreen } from '../../screens/utils';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { useResetPasswordMutation } from '../../API/mutation/resetPassword/resetPassword';
import { resetPasswordVariables } from '../../API/mutation/resetPassword/__generated__/resetPassword';
import Toast from '../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import InAppPurchases from '../../modules/InAppPurchases';

export interface ResetPasswordProps {
  token: string;
}

const ResetPassword = (props: ResetPasswordProps) => {
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

      // Bind in app purchases
      InAppPurchases.init();

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
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


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
