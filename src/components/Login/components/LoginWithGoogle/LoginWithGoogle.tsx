import React, { useState, useEffect, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { goHome, goToRequireUpdateScreen, pushScreen } from '../../../../screens/utils';
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
import OnboardingWelcomeScreen from '../../../../screens/OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { store } from '../../../../utils/storage';
import { useScreenProps } from '../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../../../modules/Toast';
import Icon, { ICON } from '../../../UI/Icon/Icon';

interface LoginWithGoogleProps {
  disabled?: boolean;
  buttonText: string;
}

const LoginWithGoogle: FC<LoginWithGoogleProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const screenProps = useScreenProps();


  /**
   * Configure on mount
   */
  useEffect(() => {
    GoogleSignin.configure();
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
      getSelfQuery();
    },
    onError: (e) => {
      setLoading(false);
      signOut();

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
          name={ICON.GOOGLE}
          size="small"
        />
      )}
      type="GOOGLE"
      title={props.buttonText}
      disabled={props.disabled || loading}
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

            pushToast({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: true,
            });
          } else {
            // some other error happened

            pushToast({
              duration: 1000,
              component: (
                <Toast content="Something went wrong" />
              ),
              dismissible: true,
            });
          }
        }
      }}
    />
  );
};

export default LoginWithGoogle;
