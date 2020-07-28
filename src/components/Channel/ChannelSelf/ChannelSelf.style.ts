import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  manageButton: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
  },
  editButton: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: color.mono.light,
    borderRadius: 100,
    justifyContent: 'center',
    marginLeft: spacing.xsmall,
    width: scalePx(24),
  },
});
