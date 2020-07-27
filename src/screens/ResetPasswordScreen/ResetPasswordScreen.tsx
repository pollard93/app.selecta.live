import React, { FC } from 'react';
import { ScreenProps } from '../utils/interfaces';
import ResetPassword, { ResetPasswordProps } from '../../components/ResetPassword/ResetPassword';

interface ResetPasswordScreenPropsE extends ScreenProps {}
interface ResetPasswordScreenPropsE extends ResetPasswordProps {}
export interface ResetPasswordScreenProps extends ResetPasswordScreenPropsE {}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = (props) => (
  <ResetPassword {...props} />
);

export default ResetPasswordScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ResetPasswordScreen.prototype.ScreenName = 'ResetPasswordScreen';

/**
 * Export as const so can be imported without the default
 */
export const ResetPasswordScreenName = ResetPasswordScreen.prototype.ScreenName;
