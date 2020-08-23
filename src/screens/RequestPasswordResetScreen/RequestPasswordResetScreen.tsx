import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import RequestPasswordReset, { RequestPasswordResetProps } from '../../components/RequestPasswordReset/RequestPasswordReset';

export interface RequestPasswordResetScreenProps extends RequestPasswordResetProps {}

const RequestPasswordResetScreen: FC<RequestPasswordResetScreenProps> = (props) => (
  <RequestPasswordReset {...props} />
);

export default RequestPasswordResetScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
RequestPasswordResetScreen.prototype.ScreenName = 'RequestPasswordResetScreen';

/**
 * Set Screen options or remove to use default
 */
(RequestPasswordResetScreen.prototype.options as Options) = {
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
RequestPasswordResetScreen.prototype.fullScreen = true;
// RequestPasswordResetScreen.prototype.statusBarColor = color.mono.dark;
// RequestPasswordResetScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const RequestPasswordResetScreenName = RequestPasswordResetScreen.prototype.ScreenName;
