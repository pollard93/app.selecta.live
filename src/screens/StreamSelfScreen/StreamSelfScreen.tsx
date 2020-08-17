import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import StreamSelf, { StreamSelfProps } from '../../components/Stream/StreamSelf/StreamSelf';

export interface StreamSelfScreenProps extends StreamSelfProps {}

const StreamSelfScreen: FC<StreamSelfScreenProps> = (props) => (
  <StreamSelf {...props} />
);

export default StreamSelfScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
StreamSelfScreen.prototype.ScreenName = 'StreamSelfScreen';

/**
 * Set Screen options or remove to use default
 */
(StreamSelfScreen.prototype.options as Options) = {
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
StreamSelfScreen.prototype.fullScreen = true;
// StreamSelfScreen.prototype.statusBarColor = color.mono.dark;
// StreamSelfScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const StreamSelfScreenName = StreamSelfScreen.prototype.ScreenName;
