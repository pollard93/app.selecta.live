import React from 'react';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { ApolloProvider } from 'react-apollo';
import Storybook, { client } from './storybook';
import ModalScreen from './src/screens/ModalScreen/ModalScreen';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

Navigation.registerComponent('Storybook', () => Storybook);
Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => {
  const wrapped = (props) => (
    <ApolloProvider client={client}>
      <ModalScreen {...props} />
    </ApolloProvider>
  );
  return wrapped;
});

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
