import { StyleSheet } from 'react-native';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
  skeletonWrap: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: color.mono.pale.regular,
    justifyContent: 'center',
  },
  skeletonImage: {
    height: scalePx(25),
    opacity: 0.1,
    tintColor: color.mono.pale.dark,
    width: scalePx(25),
  },
});
