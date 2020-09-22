import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import ConsumingStreamProfiles, { ConsumingStreamProfilesProps } from '../../components/Stream/ConsumingStreamProfiles/ConsumingStreamProfiles';
import { useMounted } from '../utils';

export interface ConsumingStreamProfilesScreenProps extends ConsumingStreamProfilesProps {}

const ConsumingStreamProfilesScreen: FC<ConsumingStreamProfilesScreenProps> = (props) => {
  const mounted = useMounted(ConsumingStreamProfilesScreen.prototype.ScreenName);
  if (!mounted) return null;

  return (
    <ConsumingStreamProfiles {...props} />
  );
};

export default ConsumingStreamProfilesScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ConsumingStreamProfilesScreen.prototype.ScreenName = 'ConsumingStreamProfilesScreen';

/**
 * Set Screen options or remove to use default
 */
(ConsumingStreamProfilesScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
ConsumingStreamProfilesScreen.prototype.fullScreen = true;
// ConsumingStreamProfilesScreen.prototype.statusBarColor = color.mono.dark;
// ConsumingStreamProfilesScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const ConsumingStreamProfilesScreenName = ConsumingStreamProfilesScreen.prototype.ScreenName;
