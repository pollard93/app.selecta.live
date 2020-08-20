import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import Profile, { ProfileProps } from '../../components/UserSelf/Profile/Profile';

export interface ProfileScreenProps extends ProfileProps {}

const ProfileScreen: FC<ProfileScreenProps> = (props) => (
  <Profile {...props} />
);

export default ProfileScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ProfileScreen.prototype.ScreenName = 'ProfileScreen';

/**
 * Set Screen options or remove to use default
 */
(ProfileScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
ProfileScreen.prototype.fullScreen = true;
// ProfileScreen.prototype.statusBarColor = color.mono.dark;
// ProfileScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ProfileScreenName = ProfileScreen.prototype.ScreenName;
