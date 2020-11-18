import React, { useState, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Alert } from 'react-native';
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
import Button from '../../../UI/Button/Button';
import { store } from '../../../../utils/storage';
import { pushToast } from '../../../../modules/Toast';
import Icon, { ICON } from '../../../UI/Icon/Icon';

interface LoginWithFacebookProps {
  disabled?: boolean;
  buttonText: string;
}

const LoginWithFacebook: FC<LoginWithFacebookProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();


  /**
   * Get self must be executed to cache the result
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
      goHome();
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
      getSelfQuery();
    },
    onError: (e) => {
      setLoading(false);
      LoginManager.logOut();

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


  return (
    <Button
      icon={(
        <Icon
          name={ICON.FACEBOOK_LOGIN}
          size="small"
          forceLight
        />
      )}
      type="FB"
      title={props.buttonText}
      disabled={props.disabled || loading}
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

            pushToast({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: true,
            });
          },
        );
      }}
    />
  );
};

export default LoginWithFacebook;
