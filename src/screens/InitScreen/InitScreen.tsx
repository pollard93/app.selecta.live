import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Options } from 'react-native-navigation';
import { useApolloClient } from 'react-apollo';
import { goToLogin, goHome, goToRequireUpdateScreen } from '../utils';
import { getToken } from '../../ApolloClient';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import PushNotifications from '../../modules/PushNotifications';
import InAppPurchases from '../../modules/InAppPurchases';
import LoadRetry from '../../components/UI/LoadRetry/LoadRetry';
import { setSafeArea } from '../../modules/SafeAreaInsets/SafeAreaInsets';
import { store } from '../../utils/storage';
import { getSelf_getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { removeChannelAccessToken } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/__generated__/removeChannelAccessToken';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../ApolloClient/resolvers/mutation/removeChannelAccessToken/removeChannelAccessTokenMutation';

const InitScreen = () => {
  const client = useApolloClient();


  /**
   * Get self query
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

      // Bind inAppPurchases
      InAppPurchases.init();

      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (getSelf.requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      // Navigate to home now getSelf is cached
      goHome();
    },
    onError: async () => {
      /**
       * If getSelf errors
       * And we have getSelf in storage, user can proceed to home, handling network issues
       * If we do not have a cached getSelf, user must go to login
       */
      const getSelf: getSelf_getSelf = await store('getSelf');
      if (getSelf) {
        goHome();
      } else {
        goToLogin();
      }
    },
    fetchPolicy: 'network-only',
  });


  /**
   * On mount, check if there's a token and determin where to send the user
   */
  useEffect(() => {
    (async () => {
      await setSafeArea();

      // Remove channel access token
      await client.mutate<removeChannelAccessToken>({
        mutation: REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION,
      });

      // Try set getSelf from cache
      const getSelf = await store('getSelf');
      if (getSelf) {
        client.cache.writeData({
          data: {
            getSelf,
          },
        });
      }

      // If there's no token go straight to login
      const token = await getToken(client);
      if (!token) {
        goToLogin();
        return;
      }

      // Execute getSelf which will try and use token in local storage from ApolloClient on request
      getSelfQuery();
    })();
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <LoadRetry loading />
    </View>
  );
};

export default InitScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
InitScreen.prototype.ScreenName = 'InitScreen';

/**
 * Set Screen options or remove to use default
 */
(InitScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
InitScreen.prototype.fullScreen = true;
// InitScreen.prototype.statusBarColor = color.mono.dark;
// InitScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const InitScreenName = InitScreen.prototype.ScreenName;
