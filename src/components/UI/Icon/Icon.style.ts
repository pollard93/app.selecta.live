import { StyleSheet } from 'react-native';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  base: {
    tintColor: color.mono.dark,
  },
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
});
