import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.dark,
    height: 2,
    justifyContent: 'center',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  mainTrack: {
    backgroundColor: color.accent.primary,
    height: 2,
  },
  borderRadius: {
    borderRadius: 500,
  },
  thumbInner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
