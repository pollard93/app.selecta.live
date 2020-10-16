import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import Login, { LoginProps } from '../../components/Login/Login';
import color from '../../styles/definitions/color';

export interface LoginScreenProps extends LoginProps {}

const LoginScreen: FC<LoginScreenProps> = (props) => (
  <Login {...props} />
);

export default LoginScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
LoginScreen.prototype.ScreenName = 'LoginScreen';

/**
 * Set Screen options or remove to use default
 */
(LoginScreen.prototype.options as Options) = {
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
LoginScreen.prototype.fullScreen = true;
// LoginScreen.prototype.statusBarColor = color.mono.dark;
// LoginScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const LoginScreenName = LoginScreen.prototype.ScreenName;
