import { Navigation } from 'react-native-navigation';
import { Linking } from 'react-native';
import { registerScreens } from './src/screens';
import { InitScreenName } from './src/screens/InitScreen/InitScreen';
import { onOpenLink } from './src/modules/DeepLink';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  /**
   * Start listening for deep linking
   * Remove incase it's been bound
   */
  Linking.removeEventListener('url', onOpenLink);
  Linking.addEventListener('url', onOpenLink);

  Navigation.setRoot({
    root: {
      component: {
        name: InitScreenName,
      },
    },
  });
});
