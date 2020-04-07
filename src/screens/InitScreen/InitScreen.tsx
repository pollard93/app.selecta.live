import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Options } from 'react-native-navigation';
import { useApolloClient } from 'react-apollo';
import { goToLogin, goHome, goToRequireUpdateScreen } from '../utils';
import { getToken } from '../../ApolloClient';
import { useGetSelfLazyQuery } from '../../API/query/getSelf/getSelf';
import PushNotifications from '../../modules/PushNotifications';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import InAppPurchases from '../../modules/InAppPurchases';

const InitScreen = () => {
  /**
   * Get self query
   */
  const [getSelfQuery] = useGetSelfLazyQuery({
    onCompleted: ({ getSelf: { id, requiresUpdate } }) => {
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
    onError: () => {
      goToLogin({});
    },
  });


  /**
   * On mount, check if there's a token and determin where to send the user
   */
  useEffect(() => {
    (async () => {
      // If there's no token go straight to login
      const token = await getToken();
      if (!token) {
        goToLogin({});
        return;
      }

      // Execute getSelf which will try and use token in local storage from ApolloClient on request
      getSelfQuery();
    })();
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <Text>Loading</Text>
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
