import React from 'react';
import RequestPasswordReset from '../../components/RequestPasswordReset/RequestPasswordReset';

const RequestPasswordResetScreen = () => (
  <RequestPasswordReset />
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
