import React, { useEffect } from 'react';
import { View, Text, Linking, Platform, Button } from 'react-native';
import { Options } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery } from '../../API/query/getSelf/getSelf';

const RequireUpdateScreen = () => {
  const { data: { getSelf } } = useGetSelfQuery();

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
            const url = Platform.OS === 'ios' ? getSelf.requiresUpdate.appStoreUrl : getSelf.requiresUpdate.playStoreUrl;
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
