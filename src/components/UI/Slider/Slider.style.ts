import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  outer: {
    maxHeight: 2,
  },
  wrap: {
    height: scalePx(30),
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: -scalePx(16),
  },
  inner: {
    backgroundColor: color.monoDarkMode.pale.light.color().alpha(0.5).toString(),
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  trackInner: {
    height: 2,
  },
  mainTrack: {
    backgroundColor: color.accent.primary,
    height: 2,
  },
  borderRadius: {
    borderRadius: 500,
  },
});
