import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import OnboardingNotifications, { OnboardingNotificationsProps } from '../../../components/Onboarding/OnboardingNotifications/OnboardingNotifications';

export interface OnboardingNotificationsScreenProps extends OnboardingNotificationsProps {}

const OnboardingNotificationsScreen: FC<OnboardingNotificationsScreenProps> = (props) => (
  <OnboardingNotifications {...props} />
);

export default OnboardingNotificationsScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
OnboardingNotificationsScreen.prototype.ScreenName = 'OnboardingNotificationsScreen';

/**
 * Set Screen options or remove to use default
 */
(OnboardingNotificationsScreen.prototype.options as Options) = {
  // topBar: {
  //   visible: false,
  // },
};

/**
 * Set screen color options (default white)
 */
// OnboardingNotificationsScreen.prototype.fullScreen = true;
// OnboardingNotificationsScreen.prototype.statusBarColor = color.mono.dark;
// OnboardingNotificationsScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const OnboardingNotificationsScreenName = OnboardingNotificationsScreen.prototype.ScreenName;
