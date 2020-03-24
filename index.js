/* DEFAULT APPLICATION */
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { InitScreenName } from './src/screens/InitScreen/InitScreen';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: InitScreenName,
      },
    },
  });
});
/* */

/* STORYBOOK *
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Storybook from './storybook';

console.disableYellowBox = true;

Navigation.registerComponent('Storybook', () => Storybook);

Navigation.events().registerAppLaunchedListener(() => {
  SplashScreen.hide();

  Navigation.setRoot({
    root: {
      component: {
        name: 'Storybook',
      },
    },
  });
});
/* */
