import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import HomeFeed, { HomeFeedProps } from '../../components/HomeFeed/HomeFeed';
import color from '../../styles/definitions/color';

export interface HomeFeedScreenProps extends HomeFeedProps {}

const HomeFeedScreen: FC<HomeFeedScreenProps> = (props) => (
  <HomeFeed {...props} />
);

export default HomeFeedScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
HomeFeedScreen.prototype.ScreenName = 'HomeFeedScreen';

/**
 * Set Screen options or remove to use default
 */
(HomeFeedScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  statusBar: {
    style: 'dark',
  },
};

/**
 * Set screen color options (default white)
 */
HomeFeedScreen.prototype.fullScreen = true;
HomeFeedScreen.prototype.statusBarColor = color.mono.dark;
// HomeFeedScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const HomeFeedScreenName = HomeFeedScreen.prototype.ScreenName;
