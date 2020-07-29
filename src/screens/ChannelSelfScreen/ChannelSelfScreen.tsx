import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import ChannelSelf, { ChannelSelfProps } from '../../components/Channel/ChannelSelf/ChannelSelf';

interface ChannelSelfScreenProps extends ChannelSelfProps {}

const ChannelSelfScreen: FC<ChannelSelfScreenProps> = (props) => (
  <ChannelSelf {...props} />
);

export default ChannelSelfScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelSelfScreen.prototype.ScreenName = 'ChannelSelfScreen';

/**
 * Set Screen options or remove to use default
 */
(ChannelSelfScreen.prototype.options as Options) = {
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
ChannelSelfScreen.prototype.fullScreen = true;
// ChannelSelfScreen.prototype.statusBarColor = color.mono.dark;
// ChannelSelfScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ChannelSelfScreenName = ChannelSelfScreen.prototype.ScreenName;
