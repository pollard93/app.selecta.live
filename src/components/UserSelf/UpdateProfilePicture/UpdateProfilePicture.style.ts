import { StyleSheet } from 'react-native';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    aspectRatio: 1,
    borderRadius: 1000,
    maxWidth: scalePx(150),
    overflow: 'hidden',
    width: '40%',
  },
});
