import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  item: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRadius: {
    backgroundColor: color.accent.primary,
    borderRadius: 500,
  },
});
