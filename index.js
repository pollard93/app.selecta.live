import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import { InitScreenName } from './src/screens/InitScreen/InitScreen';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  console.log('launched');

  Navigation.setRoot({
    root: {
      component: {
        name: InitScreenName,
      },
    },
  });
});
