import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Storybook from './storybook';

// eslint-disable-next-line no-console
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
