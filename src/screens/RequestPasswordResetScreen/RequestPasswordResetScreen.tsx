import React, { FC } from 'react';
import RequestPasswordReset, { RequestPasswordResetProps } from '../../components/RequestPasswordReset/RequestPasswordReset';

const RequestPasswordResetScreen: FC<RequestPasswordResetProps> = (props) => (
  <RequestPasswordReset {...props} />
);

export default RequestPasswordResetScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
RequestPasswordResetScreen.prototype.ScreenName = 'RequestPasswordResetScreen';

/**
 * Export as const so can be imported without the default
 */
export const RequestPasswordResetScreenName = RequestPasswordResetScreen.prototype.ScreenName;
