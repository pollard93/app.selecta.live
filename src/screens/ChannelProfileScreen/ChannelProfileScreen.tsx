import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import ChannelProfile, { ChannelProfileProps } from '../../components/Channel/ChannelProfile/ChannelProfile';

interface ChannelProfileScreenProps extends ChannelProfileProps {}

const ChannelProfileScreen: FC<ChannelProfileScreenProps> = (props) => (
  <ChannelProfile {...props} />
);

export default ChannelProfileScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelProfileScreen.prototype.ScreenName = 'ChannelProfileScreen';

/**
 * Set Screen options or remove to use default
 */
(ChannelProfileScreen.prototype.options as Options) = {
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
ChannelProfileScreen.prototype.fullScreen = true;
// ChannelProfileScreen.prototype.statusBarColor = color.mono.dark;
// ChannelProfileScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ChannelProfileScreenName = ChannelProfileScreen.prototype.ScreenName;
