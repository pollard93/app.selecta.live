import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import GoLiveIntro, { GoLiveIntroProps } from '../../components/Stream/GoLiveIntro/GoLiveIntro';

export interface GoLiveIntroScreenProps extends GoLiveIntroProps {}

const GoLiveIntroScreen: FC<GoLiveIntroScreenProps> = (props) => (
  <GoLiveIntro {...props} />
);

export default GoLiveIntroScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
GoLiveIntroScreen.prototype.ScreenName = 'GoLiveIntroScreen';

/**
 * Set Screen options or remove to use default
 */
(GoLiveIntroScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: false,
    animate: true,
  },
};

/**
 * Set screen color options (default white)
 */
GoLiveIntroScreen.prototype.fullScreen = true;
// GoLiveIntroScreen.prototype.statusBarColor = color.mono.dark;
// GoLiveIntroScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const GoLiveIntroScreenName = GoLiveIntroScreen.prototype.ScreenName;
