import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import ChannelSelfs, { ChannelSelfsProps } from '../../components/Channel/ChannelSelfs/ChannelSelfs';

export interface ChannelSelfsScreenProps extends ChannelSelfsProps {}

const ChannelSelfsScreen: FC<ChannelSelfsScreenProps> = (props) => (
  <ChannelSelfs {...props} />
);

export default ChannelSelfsScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelSelfsScreen.prototype.ScreenName = 'ChannelSelfsScreen';

/**
 * Set Screen options or remove to use default
 */
(ChannelSelfsScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
ChannelSelfsScreen.prototype.fullScreen = true;
// ChannelSelfsScreen.prototype.statusBarColor = color.mono.dark;
// ChannelSelfsScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ChannelSelfsScreenName = ChannelSelfsScreen.prototype.ScreenName;
