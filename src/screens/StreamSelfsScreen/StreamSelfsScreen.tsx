import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import StreamSelfs, { StreamSelfsProps } from '../../components/Stream/StreamSelfs/StreamSelfs';

export interface StreamSelfsScreenProps extends StreamSelfsProps {}

const StreamSelfsScreen: FC<StreamSelfsScreenProps> = (props) => (
  <StreamSelfs {...props} />
);

export default StreamSelfsScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
StreamSelfsScreen.prototype.ScreenName = 'StreamSelfsScreen';

/**
 * Set Screen options or remove to use default
 */
(StreamSelfsScreen.prototype.options as Options) = {
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
StreamSelfsScreen.prototype.fullScreen = true;
// StreamSelfsScreen.prototype.statusBarColor = color.mono.dark;
// StreamSelfsScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const StreamSelfsScreenName = StreamSelfsScreen.prototype.ScreenName;
