import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import UpdateChannel from '../../components/Channel/UpdateChannel/UpdateChannel';
import { useGetChannelSelfQuery } from '../../API/query/getChannelSelf/getChannelSelf';
import { ScreenProps } from '../utils/interfaces';

interface UpdateChannelScreenProps extends ScreenProps {}

const UpdateChannelScreen: FC<UpdateChannelScreenProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();

  return (
    <UpdateChannel data={getChannelSelf} {...props} />
  );
};

export default UpdateChannelScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
UpdateChannelScreen.prototype.ScreenName = 'UpdateChannelScreen';

/**
 * Set Screen options or remove to use default
 */
(UpdateChannelScreen.prototype.options as Options) = {
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
UpdateChannelScreen.prototype.fullScreen = true;
// UpdateChannelScreen.prototype.statusBarColor = color.mono.dark;
// UpdateChannelScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const UpdateChannelScreenName = UpdateChannelScreen.prototype.ScreenName;
