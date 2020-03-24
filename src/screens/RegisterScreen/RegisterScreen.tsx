import React from 'react';
import { ScreenProps } from '../utils/interfaces';
import Register, { RegisterProps } from '../../components/Register/Register';

// Merge screen and login props to export
interface RegisterScreenPropsE extends Partial<ScreenProps> {}
interface RegisterScreenPropsE extends RegisterProps {}
export interface RegisterScreenProps extends RegisterScreenPropsE {}

const RegisterScreen = (props: RegisterScreenProps) => (
  <Register {...props} />
);

export default RegisterScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
RegisterScreen.prototype.ScreenName = 'RegisterScreen';

/**
 * Export as const so can be imported without the default
 */
export const RegisterScreenName = RegisterScreen.prototype.ScreenName;
