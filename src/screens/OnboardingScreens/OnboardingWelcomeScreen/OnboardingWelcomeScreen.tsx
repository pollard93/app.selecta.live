import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import OnboardingWelcome, { OnboardingWelcomeProps } from '../../../components/Onboarding/OnboardingWelcome/OnboardingWelcome';

export interface OnboardingWelcomeScreenProps extends OnboardingWelcomeProps {}

const OnboardingWelcomeScreen: FC<OnboardingWelcomeScreenProps> = (props) => (
  <OnboardingWelcome {...props} />
);

export default OnboardingWelcomeScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
OnboardingWelcomeScreen.prototype.ScreenName = 'OnboardingWelcomeScreen';

/**
 * Set Screen options or remove to use default
 */
(OnboardingWelcomeScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  statusBar: {
    style: 'light',
  },
};

/**
 * Set screen color options (default white)
 */
// OnboardingWelcomeScreen.prototype.fullScreen = true;
// OnboardingWelcomeScreen.prototype.statusBarColor = color.mono.dark;
// OnboardingWelcomeScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const OnboardingWelcomeScreenName = OnboardingWelcomeScreen.prototype.ScreenName;
