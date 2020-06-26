import React, { FC } from 'react';
import Register, { RegisterProps } from '../../components/Register/Register';
import color from '../../styles/definitions/color';

export interface RegisterScreenProps extends RegisterProps {}

const RegisterScreen: FC<RegisterScreenProps> = (props) => (
  <Register {...props} />
);

export default RegisterScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
RegisterScreen.prototype.ScreenName = 'RegisterScreen';

/**
 * Set Screen options or remove to use default
 */
(RegisterScreen.prototype.options as Options) = {
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
// RegisterScreen.prototype.fullScreen = true;
RegisterScreen.prototype.statusBarColor = color.mono.dark;
RegisterScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const RegisterScreenName = RegisterScreen.prototype.ScreenName;
