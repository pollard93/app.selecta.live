import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

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
