import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import Wallet, { WalletProps } from '../../components/Wallet/Wallet';
import { useMounted } from '../utils';

export interface WalletScreenProps extends WalletProps {}

const WalletScreen: FC<WalletScreenProps> = (props) => {
  const mounted = useMounted(WalletScreen.prototype.ScreenName);
  if (!mounted) return null;

  return (
    <Wallet {...props} />
  );
};

export default WalletScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
WalletScreen.prototype.ScreenName = 'WalletScreen';

/**
 * Set Screen options or remove to use default
 */
(WalletScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
WalletScreen.prototype.fullScreen = true;
// WalletScreen.prototype.statusBarColor = color.mono.dark;
// WalletScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const WalletScreenName = WalletScreen.prototype.ScreenName;
