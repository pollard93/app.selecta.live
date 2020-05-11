import React, { ReactNode } from 'react';
import { View } from 'react-native';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import { ScreenProps } from '../utils/interfaces';

export interface ModalScreenProps extends ScreenProps {
  component: ReactNode;
}

const ModalScreen = (props: ModalScreenProps) => (
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
 * Export as const so can be imported without the default
 */
export const ModalScreenName = ModalScreen.prototype.ScreenName;
