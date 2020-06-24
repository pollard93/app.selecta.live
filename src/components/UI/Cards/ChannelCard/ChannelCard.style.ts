import { StyleSheet } from 'react-native';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.light,
    maxHeight: scalePx(20),
  },
  image: {
    aspectRatio: 1,
  },
});
