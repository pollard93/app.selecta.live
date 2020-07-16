import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import StreamProfile, { StreamProfileProps } from '../../components/Stream/StreamProfile/StreamProfile';

interface StreamProfileScreenProps extends StreamProfileProps {}

const StreamProfileScreen: FC<StreamProfileScreenProps> = (props) => (
  <StreamProfile {...props} />
);

export default StreamProfileScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
StreamProfileScreen.prototype.ScreenName = 'StreamProfileScreen';

/**
 * Set Screen options or remove to use default
 */
(StreamProfileScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  // statusBar: {
  //   style: 'dark',
  //   backgroundColor: 'white',
  // },
  bottomTabs: {
    visible: false,
    animate: true,
  },
};

/**
 * Set screen color options (default white)
 */
StreamProfileScreen.prototype.fullScreen = true;
// StreamProfileScreen.prototype.statusBarColor = color.mono.dark;
// StreamProfileScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const StreamProfileScreenName = StreamProfileScreen.prototype.ScreenName;
