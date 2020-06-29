import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Options } from 'react-native-navigation';
import { useApolloClient } from 'react-apollo';
import SafeArea from 'react-native-safe-area';
import { goToLogin, goHome, goToRequireUpdateScreen, goToChannelStack, goToOnboarding } from '../utils';
import { getToken, getChannelToken } from '../../ApolloClient';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfLazyQuery } from '../../API/query/getChannelSelf/getChannelSelf';
import PushNotifications from '../../modules/PushNotifications';
import InAppPurchases from '../../modules/InAppPurchases';
import LoadRetry from '../../components/UI/LoadRetry/LoadRetry';
import { setSafeArea } from '../../modules/SafeAreaInsets/SafeAreaInsets';

const InitScreen = () => {
  const client = useApolloClient();


  /**
   * Get channel self query
   */
  const [getChannelSelf] = useGetChannelSelfLazyQuery({
    onCompleted: async () => {
      // User is logged in as a channel, go to channel stack
      goToChannelStack();
    },
    onError: () => {
      goHome();
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Get self query
   */
  const [getSelfQuery] = useGetSelfLazyQuery({
    onCompleted: async ({ getSelf: { id, username, requiresUpdate } }) => {
      // Bind notifications
      PushNotifications.init(id);

      // Bind inAppPurchases
      InAppPurchases.init();

      /**
       * If requires update is true, can be null or false, then go to RequireUpdateScreen
       */
      if (requiresUpdate) {
        goToRequireUpdateScreen();
        return;
      }

      /**
       * If no username is set, send user to welcome screen
       */
      if (!username) {
        goToOnboarding();
        return;
      }

      // If there's no token go to ChannelSelfs
      const channelToken = await getChannelToken(client);
      if (!channelToken) {
        // Navigate to home now getSelf is cached
        goHome();
        return;
      }

      // Execute getChannelSelf which will try and use channel token in local storage from ApolloClient on request
      getChannelSelf();
    },
    onError: () => {
      goToLogin();
    },
    fetchPolicy: 'network-only',
  });


  /**
   * On mount, check if there's a token and determin where to send the user
   */
  useEffect(() => {
    (async () => {
      await setSafeArea();

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
 * Export as const so can be imported without the default
 */
export const InitScreenName = InitScreen.prototype.ScreenName;
