import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import OnboardingGetStarted, { OnboardingGetStartedProps } from '../../../components/Onboarding/OnboardingGetStarted/OnboardingGetStarted';

export interface OnboardingGetStartedScreenProps extends OnboardingGetStartedProps {}

const OnboardingGetStartedScreen: FC<OnboardingGetStartedScreenProps> = (props) => (
  <OnboardingGetStarted {...props} />
);

export default OnboardingGetStartedScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
OnboardingGetStartedScreen.prototype.ScreenName = 'OnboardingGetStartedScreen';

/**
 * Set Screen options or remove to use default
 */
(OnboardingGetStartedScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
// OnboardingGetStartedScreen.prototype.fullScreen = true;
// OnboardingGetStartedScreen.prototype.statusBarColor = color.mono.dark;
// OnboardingGetStartedScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const OnboardingGetStartedScreenName = OnboardingGetStartedScreen.prototype.ScreenName;
