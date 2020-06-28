import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';
import font from '../../../styles/definitions/font';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
  },
  icon: {
    marginLeft: spacing.xsmall,
    tintColor: color.mono.light,
  },
});
