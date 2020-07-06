import React, { FC } from 'react';
import Feed, { FeedProps } from '../../components/Feed/Feed';

export interface FeedScreenProps extends FeedProps {}

const FeedScreen: FC<FeedScreenProps> = (props) => (
  <Feed {...props} />
);

export default FeedScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
FeedScreen.prototype.ScreenName = 'FeedScreen';

/**
 * Set Screen options or remove to use default
 */
(FeedScreen.prototype.options as Options) = {
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
FeedScreen.prototype.fullScreen = true;
// FeedScreen.prototype.statusBarColor = color.mono.dark;
// FeedScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const FeedScreenName = FeedScreen.prototype.ScreenName;
