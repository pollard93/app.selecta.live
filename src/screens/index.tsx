/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { ApolloProvider } from 'react-apollo';
import { SafeAreaView, View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import ApolloClient from '../ApolloClient';
import InitScreen from './InitScreen/InitScreen';
import GlobalStyles, { GlobalDynamicStyles } from '../styles/stylesheets/GlobalStyles';
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import RequireUpdateScreen from './RequireUpdateScreen/RequireUpdateScreen';
import ResetPasswordScreen from './ResetPasswordScreen/ResetPasswordScreen';
import RequestResetPasswordScreen from './RequestPasswordResetScreen/RequestPasswordResetScreen';
import ToastProvider from '../modules/ToastProvider/ToastProvider';
import ModalScreen from './ModalScreen/ModalScreen';
import ChannelScreen from './ChannelScreen/ChannelScreen';
import ChannelLoginScreen from './ChannelLoginScreen/ChannelLoginScreen';
import PurchasesScreen from './PurchasesScreen/PurchasesScreen';
import StreamVideoScreen from './StreamVideoScreen/StreamVideoScreen';
import OnboardingWelcomeScreen from './OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import OnboardingNotificationsScreen from './OnboardingScreens/OnboardingNotificationsScreen/OnboardingNotificationsScreen';
import OnboardingGetStartedScreen from './OnboardingScreens/OnboardingGetStartedScreen/OnboardingGetStartedScreen';
import HomeFeedScreen from './HomeFeedScreen/HomeFeedScreen';
import ChannelProfileScreen from './ChannelProfileScreen/ChannelProfileScreen';
import StreamProfileScreen from './StreamProfileScreen/StreamProfileScreen';

const wrapContext = (Component) => {
  /**
   * Wrap without SafeArea
   */
  if (Component.prototype.fullScreen) {
    const wrapped = (props) => {
      const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

      return (
        <ApolloProvider client={ApolloClient}>
          <ToastProvider screenName={Component.prototype.ScreenName}>
            <View style={[globalDynamicStyles.background, GlobalStyles.PageFill, Component.prototype.backgroundColor && { backgroundColor: Component.prototype.backgroundColor }]}>
              <Component {...props} />
            </View>
          </ToastProvider>
        </ApolloProvider>
      );
    };

    // Allows static options to be called for react-native-navigation
    (wrapped as any).options = Component.prototype.options;

    return wrapped;
  }


  /**
   * Wrap with SafeArea
   */
  const wrapped = (props) => {
    const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

    return (
      <ApolloProvider client={ApolloClient}>
        <ToastProvider screenName={Component.prototype.ScreenName}>
          <SafeAreaView style={{ flex: 0, backgroundColor: Component.prototype.statusBarColor || 'transparent' }} />
          <SafeAreaView style={[globalDynamicStyles.background, GlobalStyles.PageFill, Component.prototype.backgroundColor && { backgroundColor: Component.prototype.backgroundColor }]}>
            <View style={GlobalStyles.PageFill}>
              <Component {...props} />
            </View>
          </SafeAreaView>
        </ToastProvider>
      </ApolloProvider>
    );
  };

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
  Navigation.registerComponent(PurchasesScreen.prototype.ScreenName, () => wrapContext(PurchasesScreen));
  Navigation.registerComponent(StreamVideoScreen.prototype.ScreenName, () => wrapContext(StreamVideoScreen));
  Navigation.registerComponent(OnboardingWelcomeScreen.prototype.ScreenName, () => wrapContext(OnboardingWelcomeScreen));
  Navigation.registerComponent(OnboardingNotificationsScreen.prototype.ScreenName, () => wrapContext(OnboardingNotificationsScreen));
  Navigation.registerComponent(OnboardingGetStartedScreen.prototype.ScreenName, () => wrapContext(OnboardingGetStartedScreen));
  Navigation.registerComponent(HomeFeedScreen.prototype.ScreenName, () => wrapContext(HomeFeedScreen));
  Navigation.registerComponent(ChannelProfileScreen.prototype.ScreenName, () => wrapContext(ChannelProfileScreen));
  Navigation.registerComponent(StreamProfileScreen.prototype.ScreenName, () => wrapContext(StreamProfileScreen));
};
