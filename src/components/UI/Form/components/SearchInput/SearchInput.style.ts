import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';
import scalePx from '../../../../../utils/scalePx';

export default StyleSheet.create({
  input: {
    paddingRight: scalePx(20) + spacing.small * 2,
  },
  icon: {
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.small,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
