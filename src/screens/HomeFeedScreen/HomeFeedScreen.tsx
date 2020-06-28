import React, { FC } from 'react';
import HomeFeed, { HomeFeedProps } from '../../components/HomeFeed/HomeFeed';

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
    style: 'light',
  },
};

/**
 * Set screen color options (default white)
 */
HomeFeedScreen.prototype.fullScreen = true;
// HomeFeedScreen.prototype.statusBarColor = color.mono.dark;
// HomeFeedScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const HomeFeedScreenName = HomeFeedScreen.prototype.ScreenName;
