import React, { useState, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Alert } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { goHome, goToRequireUpdateScreen, pushScreenV2 } from '../../../../screens/utils';
import { useLoginWithSocialMutation } from '../../../../API/mutation/loginWithSocial/loginWithSocial';
import PushNotifications from '../../../../modules/PushNotifications';
import { useGetSelfLazyQuery } from '../../../../API/query/getSelf/getSelf';
import { SOCIAL_PROVIDER } from '../../../../../__generated__/globalTypes';
import { putAccessToken, putAccessTokenVariables } from '../../../../ApolloClient/resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../../../../ApolloClient/resolvers/mutation/putAccessToken/putAccessTokenMutation';
import Toast from '../../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../../utils/functions';
import InAppPurchases from '../../../../modules/InAppPurchases';
import Button from '../../../UI/Button/Button';
import { STACK } from '../../../../screens/utils/interfaces';
import OnboardingWelcomeScreen from '../../../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';

interface LoginWithFacebookProps {
  disabled: boolean;
  buttonText: string;
}

const LoginWithFacebook: FC<LoginWithFacebookProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const context = useToast();


  /**
   * Get self must be executed to cache the result
   */
  const [getSelf] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: { id, name, requiresUpdate } }) => {
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

      // Navigate now getSelf is cached
      if (!name) {
        // Carry on onboarding process if user has no name
        pushScreenV2(STACK.ONBOARDING, OnboardingWelcomeScreen, {}).finally(() => {
          setLoading(false);
        });
      } else {
        goHome();
      }
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
    onError: (e) => {
      setLoading(false);
      LoginManager.logOut();

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
      type="FB"
      title={props.buttonText}
      disabled={props.disabled || loading}
      loading={loading}
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
          () => {
            setLoading(false);

            context.push({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: false,
            });
          },
        );
      }}
    />
  );
};

export default LoginWithFacebook;
