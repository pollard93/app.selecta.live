import React, { useEffect } from 'react';
import { View, Text, Linking, Platform, Button } from 'react-native';
import { Options } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Config from 'react-native-config';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

const RequireUpdateScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={GlobalStyles.PageFill}>
      <Text>Please update your app</Text>
      <Button
        title="Update"
        onPress={async () => {
          /**
           * Open the url to update app
           * TODO - this requires setup per app
           */
          try {
            const url = Platform.OS === 'ios' ? Config.REACT_APP_APP_STORE_LINK : Config.REACT_APP_PLAY_STORE_LINK;
            await Linking.openURL(url);
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }}
      />
    </View>
  );
};

export default RequireUpdateScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
RequireUpdateScreen.prototype.ScreenName = 'RequireUpdateScreen';

/**
 * Set Screen options or remove to use default
 */
(RequireUpdateScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Export as const so can be imported without the default
 */
export const RequireUpdateScreenName = RequireUpdateScreen.prototype.ScreenName;
