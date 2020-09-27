import React, { ReactNode, FC } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

export interface ModalScreenProps {
  component: ReactNode;
}

const ModalScreen: FC<ModalScreenProps> = (props) => (
  <View style={GlobalStyles.PageFill}>
    {props.component}
  </View>
);

export default ModalScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
ModalScreen.prototype.ScreenName = 'ModalScreen';

/**
 * Set screen color options (default white)
 */
ModalScreen.prototype.fullScreen = true;
// ModalScreen.prototype.statusBarColor = color.mono.dark;
ModalScreen.prototype.backgroundColor = 'transparent';

/**
 * Export as const so can be imported without the default
 */
export const ModalScreenName = ModalScreen.prototype.ScreenName;
