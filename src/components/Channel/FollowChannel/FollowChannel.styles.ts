import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
  },
  icon: {
    aspectRatio: 1,
    marginLeft: spacing.xsmall,
    tintColor: color.mono.light,
    width: scalePx(12),
  },
});
