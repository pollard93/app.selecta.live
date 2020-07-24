import React, { FC } from 'react';
import ChannelLogin, { ChannelLoginProps } from '../../components/Channel/ChannelLogin/ChannelLogin';
import { ScreenProps } from '../utils/interfaces';

interface ChannelLoginScreenPropsExt extends ScreenProps {}
interface ChannelLoginScreenPropsExt extends ChannelLoginProps {}
export interface ChannelLoginScreenProps extends ChannelLoginScreenPropsExt {}

const ChannelLoginScreen: FC<ChannelLoginScreenProps> = (props) => <ChannelLogin id={props.id} />;

export default ChannelLoginScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ChannelLoginScreen.prototype.ScreenName = 'ChannelLoginScreen';

/**
 * Export as const so can be imported without the default
 */
export const ChannelLoginScreenName = ChannelLoginScreen.prototype.ScreenName;
