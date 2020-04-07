import React, { useState, useEffect } from 'react';
import { useApolloClient } from 'react-apollo';
import { Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { useToast } from 'mbp-components-rn-toast';
import { goHome, goToRequireUpdateScreen } from '../../../../screens/utils';
import { useLoginWithSocialMutation } from '../../../../API/mutation/loginWithSocial/loginWithSocial';
import PushNotifications from '../../../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../../../API/query/getSelf/getSelf';
import { SOCIAL_PROVIDER } from '../../../../../__generated__/globalTypes';
import { putAccessToken, putAccessTokenVariables } from '../../../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import Toast from '../../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../../utils/functions';
import InAppPurchases from '../../../../modules/InAppPurchases';

const LoginWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const context = useToast();


  /**
   * Configure on mount
   */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '235314003497-37plkfi911daivvke6ic7pv4mhphg68l.apps.googleusercontent.com',
      iosClientId: '235314003497-4jl8egs3ca885o2crijqngq3i86rh6cu.apps.googleusercontent.com',
    });
  }, []);


  /**
   * Sign out of google
   */
  const signOut = async () => {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };


  /**
   * Get self must be executed to cache the result
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
   * Login with social mutation
   */
  const [loginSocialMutation] = useLoginWithSocialMutation({
    onCompleted: async ({ loginWithSocial: { token } }) => {
      // Google user token has been used, and the user is now logged in as normal
      // Logout to discard unnecessary token
      signOut();

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
      signOut();

      context.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  return (
    <Button
      title="Login with google"
      disabled={loading}
      onPress={async () => {
        setLoading(true);

        try {
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn();

          const { idToken } = await GoogleSignin.getTokens();
          loginSocialMutation({
            context: {
              headers: {
                authorization: idToken,
              },
            },
            variables: {
              provider: SOCIAL_PROVIDER.GOOGLE,
            },
          });
        } catch (error) {
          setLoading(false);

          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated

            context.push({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: false,
            });
          } else {
            // some other error happened

            context.push({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: false,
            });
          }
        }
      }}
    />
  );
};

export default LoginWithGoogle;
