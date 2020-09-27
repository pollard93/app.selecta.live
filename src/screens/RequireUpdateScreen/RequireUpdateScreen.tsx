import React, { useEffect } from 'react';
import { View, Linking, Platform, Image } from 'react-native';
import { Options } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { DynamicValue, useDynamicValue } from 'react-native-dynamic';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { useGetSelfQuery } from '../../API/query/getSelf/getSelf';
import H4 from '../../components/UI/Typography/components/H4';
import Button from '../../components/UI/Button/Button';
import Styles from './RequireUpdateScreen.styles';

const RequireUpdateScreen = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const lightLogo = require('../../assets/images/logo-dark.png');
  const darkLogo = require('../../assets/images/logo-light.png');
  const logoUri = new DynamicValue(lightLogo, darkLogo);


  /**
   * Hide splash screen on mount
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <View style={[GlobalStyles.PageFill, GlobalStyles.MaxWidth, Styles.wrap]}>
      <Image
        source={useDynamicValue(logoUri)}
        resizeMode="contain"
      />

      <View style={Styles.contentWrap}>
        <H4 style={Styles.content}>We've made some improvements.</H4>
        <H4 style={Styles.content}>Please update your app!</H4>
      </View>

      <Button
        title="Update"
        style={Styles.button}
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
 * Set screen color options (default white)
 */
RequireUpdateScreen.prototype.fullScreen = true;

/**
 * Export as const so can be imported without the default
 */
export const RequireUpdateScreenName = RequireUpdateScreen.prototype.ScreenName;
