import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import Storybook from './storybook';
import ModalScreen from './src/screens/ModalScreen/ModalScreen';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

Navigation.registerComponent('Storybook', () => Storybook);
Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => ModalScreen);

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
