import React from 'react';
import { Options } from 'react-native-navigation';
import Login, { LoginProps } from '../../components/Login/Login';
import { ScreenProps } from '../utils/interfaces';

interface LoginScreenProps extends ScreenProps {}
interface LoginScreenProps extends LoginProps {}

const LoginScreen = (props: LoginScreenProps) => (
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
};

/**
 * Export as const so can be imported without the default
 */
export const LoginScreenName = LoginScreen.prototype.ScreenName;
