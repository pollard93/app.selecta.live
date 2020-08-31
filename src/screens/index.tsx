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
import RequireUpdateScreen from './RequireUpdateScreen/RequireUpdateScreen';
import ResetPasswordScreen from './ResetPasswordScreen/ResetPasswordScreen';
import RequestResetPasswordScreen from './RequestPasswordResetScreen/RequestPasswordResetScreen';
import ToastProvider from '../modules/ToastProvider/ToastProvider';
import ModalScreen from './ModalScreen/ModalScreen';
import ChannelSelfScreen from './ChannelSelfScreen/ChannelSelfScreen';
import ChannelLoginScreen from './ChannelLoginScreen/ChannelLoginScreen';
import OnboardingWelcomeScreen from './OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import OnboardingNotificationsScreen from './OnboardingScreens/OnboardingNotificationsScreen/OnboardingNotificationsScreen';
import OnboardingGetStartedScreen from './OnboardingScreens/OnboardingGetStartedScreen/OnboardingGetStartedScreen';
import HomeFeedScreen from './HomeFeedScreen/HomeFeedScreen';
import ChannelProfileScreen from './ChannelProfileScreen/ChannelProfileScreen';
import StreamProfileScreen from './StreamProfileScreen/StreamProfileScreen';
import NetworkNotifier from '../modules/NetworkNotifier/NetworkNotifier';
import UpdateChannelScreen from './UpdateChannelScreen/UpdateChannelScreen';
import StreamSelfsScreen from './StreamSelfsScreen/StreamSelfsScreen';
import CreateUpdateStreamScreen from './CreateUpdateStreamScreen/CreateUpdateStreamScreen';
import StreamSelfScreen from './StreamSelfScreen/StreamSelfScreen';
import WalletScreen from './WalletScreen/WalletScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import ToastOverlay from './ToastOverlay/ToastOverlay';
import ConsumingStreamProfilesScreen from './ConsumingStreamProfilesScreen/ConsumingStreamProfilesScreen';
import { ScreenProps } from './utils/interfaces';
import NotificationsScreen from './NotificationsScreen/NotificationsScreen';
import ScreenPropsProvider from '../modules/ScreenPropsProvider/ScreenPropsProvider';


const wrapContext = (Component) => {
  /**
   * Overlay component
   */
  if(!!Component.prototype.options?.overlay){
    const wrapped = (props: ScreenProps) => {
      return (
        <ScreenPropsProvider {...props}>
          <Component {...props} />
        </ScreenPropsProvider>
      );
    };

    // Allows static options to be called for react-native-navigation
    (wrapped as any).options = Component.prototype.options;

    return wrapped;
  }


  /**
   * Wrap without SafeArea
   */
  if (Component.prototype.fullScreen) {
    const wrapped = (props: ScreenProps) => {
      const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

      return (
        <ScreenPropsProvider {...props}>
          <ApolloProvider client={ApolloClient}>
            <ToastProvider screenName={Component.prototype.ScreenName}>
              <NetworkNotifier>
                <View style={[globalDynamicStyles.background, GlobalStyles.PageFill, Component.prototype.backgroundColor && { backgroundColor: Component.prototype.backgroundColor }]}>
                  <Component {...props} />
                </View>
              </NetworkNotifier>
            </ToastProvider>
          </ApolloProvider>
        </ScreenPropsProvider>
      );
    };

    // Allows static options to be called for react-native-navigation
    (wrapped as any).options = Component.prototype.options;

    return wrapped;
  }


  /**
   * Wrap with SafeArea
   */
  const wrapped = (props: ScreenProps) => {
    const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

    return (
      <ScreenPropsProvider {...props}>
        <ApolloProvider client={ApolloClient}>
          <ToastProvider screenName={Component.prototype.ScreenName}>
            <NetworkNotifier>
              <SafeAreaView style={{ flex: 0, backgroundColor: Component.prototype.statusBarColor || 'transparent' }} />
              <SafeAreaView style={[globalDynamicStyles.background, GlobalStyles.PageFill, Component.prototype.backgroundColor && { backgroundColor: Component.prototype.backgroundColor }]}>
                <View style={GlobalStyles.PageFill}>
                  <Component {...props} />
                </View>
              </SafeAreaView>
            </NetworkNotifier>
          </ToastProvider>
        </ApolloProvider>
      </ScreenPropsProvider>
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
  Navigation.registerComponent(RequireUpdateScreen.prototype.ScreenName, () => wrapContext(RequireUpdateScreen));
  Navigation.registerComponent(ResetPasswordScreen.prototype.ScreenName, () => wrapContext(ResetPasswordScreen));
  Navigation.registerComponent(RequestResetPasswordScreen.prototype.ScreenName, () => wrapContext(RequestResetPasswordScreen));
  Navigation.registerComponent(ModalScreen.prototype.ScreenName, () => wrapContext(ModalScreen));
  Navigation.registerComponent(ChannelSelfScreen.prototype.ScreenName, () => wrapContext(ChannelSelfScreen));
  Navigation.registerComponent(ChannelLoginScreen.prototype.ScreenName, () => wrapContext(ChannelLoginScreen));
  Navigation.registerComponent(OnboardingWelcomeScreen.prototype.ScreenName, () => wrapContext(OnboardingWelcomeScreen));
  Navigation.registerComponent(OnboardingNotificationsScreen.prototype.ScreenName, () => wrapContext(OnboardingNotificationsScreen));
  Navigation.registerComponent(OnboardingGetStartedScreen.prototype.ScreenName, () => wrapContext(OnboardingGetStartedScreen));
  Navigation.registerComponent(HomeFeedScreen.prototype.ScreenName, () => wrapContext(HomeFeedScreen));
  Navigation.registerComponent(ChannelProfileScreen.prototype.ScreenName, () => wrapContext(ChannelProfileScreen));
  Navigation.registerComponent(StreamProfileScreen.prototype.ScreenName, () => wrapContext(StreamProfileScreen));
  Navigation.registerComponent(UpdateChannelScreen.prototype.ScreenName, () => wrapContext(UpdateChannelScreen));
  Navigation.registerComponent(StreamSelfsScreen.prototype.ScreenName, () => wrapContext(StreamSelfsScreen));
  Navigation.registerComponent(CreateUpdateStreamScreen.prototype.ScreenName, () => wrapContext(CreateUpdateStreamScreen));
  Navigation.registerComponent(StreamSelfScreen.prototype.ScreenName, () => wrapContext(StreamSelfScreen));
  Navigation.registerComponent(WalletScreen.prototype.ScreenName, () => wrapContext(WalletScreen));
  Navigation.registerComponent(ProfileScreen.prototype.ScreenName, () => wrapContext(ProfileScreen));
  Navigation.registerComponent(ConsumingStreamProfilesScreen.prototype.ScreenName, () => wrapContext(ConsumingStreamProfilesScreen));
  Navigation.registerComponent(NotificationsScreen.prototype.ScreenName, () => wrapContext(NotificationsScreen));
  Navigation.registerComponent(ToastOverlay.prototype.ScreenName, () => wrapContext(ToastOverlay));
};
