import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import GoLive, { GoLiveProps } from '../../../components/Stream/GoLive/GoLive/GoLive';

export interface GoLiveScreenProps extends GoLiveProps {}

const GoLiveScreen: FC<GoLiveScreenProps> = (props) => (
  <GoLive {...props} />
);

export default GoLiveScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
GoLiveScreen.prototype.ScreenName = 'GoLiveScreen';

/**
 * Set Screen options or remove to use default
 */
(GoLiveScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
// GoLiveScreen.prototype.fullScreen = true;
// GoLiveScreen.prototype.statusBarColor = color.mono.dark;
// GoLiveScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const GoLiveScreenName = GoLiveScreen.prototype.ScreenName;
