import { StyleSheet } from 'react-native';
import scalePx from '../../../../utils/scalePx';
import color from '../../../../styles/definitions/color';
import spacing from '../../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.light,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xsmall,
    width: '100%',
  },
  logoWrap: {
    aspectRatio: 4.22972972972973,
    maxWidth: scalePx(300),
    width: '40%',
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
});
