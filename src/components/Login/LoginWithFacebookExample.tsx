/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Button, Alert } from 'react-native';
import { goHome } from '../../screens/utils';
import { useLoginWithSocialMutation } from '../../API/mutation/loginWithSocial/loginWithSocial';
import PushNotifications from '../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import { SOCIAL_PROVIDER } from '../../../__generated__/globalTypes';
import { putAccessToken, putAccessTokenVariables } from '../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';

const LoginWithFacebookExample = () => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();


  /**
   * Get self must be executed to cache the result
   */
  const [getSelf] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: { id } }) => {
      // Bind notifications
      PushNotifications.init(id);

      // Navigate to home now getSelf is cached
      goHome();
    },
    onError: () => {
      setLoading(false);
      LoginManager.logOut();
      // TODO - toast
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Login with social mutation
   */
  const [loginSocialMutation] = useLoginWithSocialMutation({
    onCompleted: async ({ loginWithSocial: { token } }) => {
      // Facebook user token has been used, and the user is now logged in as normal
      // Logout to discard unnecessary token
      LoginManager.logOut();

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
      LoginManager.logOut();
      // TODO - toast
    },
  });


  return (
    <Button
      title="Login with facebook"
      disabled={loading}
      onPress={() => {
        setLoading(true);

        /**
         * Attempt a login using the Facebook login dialog asking for public_profile and email.
         * Email is required
         */
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
          async (result) => {
            if (result.isCancelled) {
              setLoading(false);
              return;
            }

            /**
             * If email is not included in permissions, show an alert and logout
             */
            if (!result.grantedPermissions.includes('email')) {
              Alert.alert(
                'Your email is required',
                'Your email is required',
                [
                  { text: 'OK' },
                ],
                { cancelable: false },
              );
              setLoading(false);
              LoginManager.logOut();
              return;
            }

            /**
             * Sucess get facebook user access token and execute loginWithSocial using token
             */
            const { accessToken } = await AccessToken.getCurrentAccessToken();
            loginSocialMutation({
              context: {
                headers: {
                  authorization: accessToken.toString(),
                },
              },
              variables: {
                provider: SOCIAL_PROVIDER.FACEBOOK,
              },
            });
          },
          (error) => {
            setLoading(false);
            // eslint-disable-next-line no-console
            console.log(`Login fail with error: ${error}`);
          },
        );
      }}
    />
  );
};

export default LoginWithFacebookExample;
