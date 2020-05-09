import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaView } from 'react-native';
import { ToastProvider } from 'mbp-components-rn-toast';
import ApolloClient from '../ApolloClient';
import InitScreen from './InitScreen/InitScreen';
import GlobalStyles from '../styles/stylesheets/GlobalStyles';
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import RequireUpdateScreen from './RequireUpdateScreen/RequireUpdateScreen';
import ResetPasswordScreen from './ResetPasswordScreen/ResetPasswordScreen';
import RequestResetPasswordScreen from './RequestResetPasswordScreen/RequestResetPasswordScreen';
import ModalScreen from './ModalScreen/ModalScreen';
import ChannelScreen from './ChannelScreen/ChannelScreen';
import ChannelLoginScreen from './ChannelLoginScreen/ChannelLoginScreen';

const wrapContext = (Component) => {
  const wrapped = (props) => (
    <SafeAreaView style={GlobalStyles.PageFill}>
      <ApolloProvider client={ApolloClient}>
        <ToastProvider position='bottom'>
          <Component {...props} />
        </ToastProvider>
      </ApolloProvider>
    </SafeAreaView>
  );

  // Allows static options to be called for react-native-navigation
  (wrapped as any).options = Component.prototype.options;

  return wrapped;
};

export const registerScreens = () => {
  Navigation.registerComponent(InitScreen.prototype.ScreenName, () => wrapContext(InitScreen));
  Navigation.registerComponent(LoginScreen.prototype.ScreenName, () => wrapContext(LoginScreen));
  Navigation.registerComponent(RegisterScreen.prototype.ScreenName, () => wrapContext(RegisterScreen));
  Navigation.registerComponent(HomeScreen.prototype.ScreenName, () => wrapContext(HomeScreen));
  Navigation.registerComponent(RequireUpdateScreen.prototype.ScreenName, () => wrapContext(RequireUpdateScreen));
  Navigation.registerComponent(ResetPasswordScreen.prototype.ScreenName, () => wrapContext(ResetPasswordScreen));
  Navigation.registerComponent(RequestResetPasswordScreen.prototype.ScreenName, () => wrapContext(RequestResetPasswordScreen));
  Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => wrapContext(ModalScreen));
  Navigation.registerComponent(ChannelScreen.prototype.ScreenName, () => wrapContext(ChannelScreen));
  Navigation.registerComponent(ChannelLoginScreen.prototype.ScreenName, () => wrapContext(ChannelLoginScreen));
};
