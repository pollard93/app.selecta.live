import React from 'react';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { ApolloProvider } from 'react-apollo';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Storybook, { client } from './storybook';
import ModalScreen from './src/screens/ModalScreen/ModalScreen';
import ToastOverlay from './src/screens/ToastOverlay/ToastOverlay';

// eslint-disable-next-line no-console
console.disableYellowBox = true;


const wrapContext = (Component) => {
  const wrapped = (props) => {
    const screenProps = {
      ...props,
      name: Component.prototype.ScreenName,
    };

    return (
      <ApolloProvider client={client}>
        <ScreenPropsProvider {...screenProps}>
          <Component {...props} />
        </ScreenPropsProvider>
      </ApolloProvider>
    );
  };

  // Allows static options to be called for react-native-navigation
  wrapped.options = Component.prototype.options;

  return gestureHandlerRootHOC(wrapped);
};


Navigation.registerComponent('Storybook', () => Storybook);
Navigation.registerComponent(ToastOverlay.prototype.ScreenName, () => wrapContext(ToastOverlay));
Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => wrapContext(ModalScreen));


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
