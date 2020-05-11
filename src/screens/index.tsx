import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaView } from 'react-native';
import ApolloClient from '../ApolloClient';
import InitScreen from './InitScreen/InitScreen';
import GlobalStyles from '../styles/stylesheets/GlobalStyles';
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import RequireUpdateScreen from './RequireUpdateScreen/RequireUpdateScreen';
import ResetPasswordScreen from './ResetPasswordScreen/ResetPasswordScreen';
import RequestResetPasswordScreen from './RequestResetPasswordScreen/RequestResetPasswordScreen';
import ToastProvider from '../modules/ToastProvider/ToastProvider';
import ModalScreen from './ModalScreen/ModalScreen';
import ChannelScreen from './ChannelScreen/ChannelScreen';
import ChannelLoginScreen from './ChannelLoginScreen/ChannelLoginScreen';
import PurchasesScreen from './PurchasesScreen/PurchasesScreen';

const wrapContext = (screenName, Component) => {
  const wrapped = (props) => (
    <SafeAreaView style={GlobalStyles.PageFill}>
      <ApolloProvider client={ApolloClient}>
        <ToastProvider screenName={screenName}>
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
  Navigation.registerComponent(InitScreen.prototype.ScreenName, () => wrapContext(InitScreen.prototype.ScreenName, InitScreen));
  Navigation.registerComponent(LoginScreen.prototype.ScreenName, () => wrapContext(LoginScreen.prototype.ScreenName, LoginScreen));
  Navigation.registerComponent(RegisterScreen.prototype.ScreenName, () => wrapContext(RegisterScreen.prototype.ScreenName, RegisterScreen));
  Navigation.registerComponent(HomeScreen.prototype.ScreenName, () => wrapContext(HomeScreen.prototype.ScreenName, HomeScreen));
  Navigation.registerComponent(RequireUpdateScreen.prototype.ScreenName, () => wrapContext(RequireUpdateScreen.prototype.ScreenName, RequireUpdateScreen));
  Navigation.registerComponent(ResetPasswordScreen.prototype.ScreenName, () => wrapContext(ResetPasswordScreen.prototype.ScreenName, ResetPasswordScreen));
  Navigation.registerComponent(RequestResetPasswordScreen.prototype.ScreenName, () => wrapContext(RequestResetPasswordScreen.prototype.ScreenName, RequestResetPasswordScreen));
  Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => wrapContext(ModalScreen.prototype.ScreenName, ModalScreen));
  Navigation.registerComponent(ChannelScreen.prototype.ScreenName, () => wrapContext(ChannelScreen.prototype.ScreenName, ChannelScreen));
  Navigation.registerComponent(ChannelLoginScreen.prototype.ScreenName, () => wrapContext(ChannelLoginScreen.prototype.ScreenName, ChannelLoginScreen));
  Navigation.registerComponent(PurchasesScreen.prototype.ScreenName, () => wrapContext(PurchasesScreen.prototype.ScreenName, PurchasesScreen));
};
