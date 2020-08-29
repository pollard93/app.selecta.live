import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import ResetPassword, { ResetPasswordProps } from '../../components/ResetPassword/ResetPassword';

export interface ResetPasswordScreenProps extends ResetPasswordProps {}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = (props) => (
  <ResetPassword {...props} />
);

export default ResetPasswordScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ResetPasswordScreen.prototype.ScreenName = 'ResetPasswordScreen';

/**
 * Set Screen options or remove to use default
 */
(ResetPasswordScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
// ResetPasswordScreen.prototype.fullScreen = true;
// ResetPasswordScreen.prototype.statusBarColor = color.mono.dark;
// ResetPasswordScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ResetPasswordScreenName = ResetPasswordScreen.prototype.ScreenName;
