import React, { FC } from 'react';
import ChannelLogin, { ChannelLoginProps } from '../../components/Channel/ChannelLogin/ChannelLogin';

interface ChannelLoginScreenProps extends ChannelLoginProps {}

const ChannelLoginScreen: FC<ChannelLoginScreenProps> = (props) => <ChannelLogin {...props} />;

export default ChannelLoginScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelLoginScreen.prototype.ScreenName = 'ChannelLoginScreen';

/**
 * Export as const so can be imported without the default
 */
export const ChannelLoginScreenName = ChannelLoginScreen.prototype.ScreenName;
