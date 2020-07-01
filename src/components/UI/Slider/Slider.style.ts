import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    height: 2,
    justifyContent: 'center',
  },
  track: StyleSheet.absoluteFillObject,
  borderRadius: {
    borderRadius: 500,
  },
  thumbInner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
