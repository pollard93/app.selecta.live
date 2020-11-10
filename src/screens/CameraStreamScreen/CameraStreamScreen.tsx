import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import CameraStream, { CameraStreamProps } from '../../components/Stream/CameraStream/CameraStream';

export interface CameraStreamScreenProps extends CameraStreamProps {}

const CameraStreamScreen: FC<CameraStreamScreenProps> = (props) => (
  <CameraStream {...props} />
);

export default CameraStreamScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
CameraStreamScreen.prototype.ScreenName = 'CameraStreamScreen';

/**
 * Set Screen options or remove to use default
 */
(CameraStreamScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: false,
    animate: true,
  },
  layout: {
    orientation: ['landscape', 'portrait'],
  },
};

/**
 * Set screen color options (default white)
 */
CameraStreamScreen.prototype.fullScreen = true;
// CameraStreamScreen.prototype.statusBarColor = color.mono.dark;
// CameraStreamScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const CameraStreamScreenName = CameraStreamScreen.prototype.ScreenName;
