import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  xxsmall: {
    height: scalePx(8),
    width: scalePx(8),
  },
  xsmall: {
    height: scalePx(15),
    width: scalePx(15),
  },
  small: {
    height: scalePx(20),
    width: scalePx(20),
  },
  regular: {
    height: scalePx(30),
    width: scalePx(30),
  },
  large: {
    height: scalePx(40),
    width: scalePx(40),
  },
  xlarge: {
    height: scalePx(50),
    width: scalePx(50),
  },
  ARROW_FORWARD: {
    tintColor: undefined,
  },
  ARROW_BACKWARD: {
    tintColor: undefined,
  },
  NOTIFICATIONS_READ_DARK: {
    tintColor: undefined,
  },
  NOTIFICATIONS_READ_LIGHT: {
    tintColor: undefined,
  },
  GOOGLE: {
    tintColor: undefined,
  },
  forceLight: {
    tintColor: color.mono.light,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  base: {
    tintColor: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
