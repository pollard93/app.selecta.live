import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    padding: spacing.xsmall,
  },
  item: {
    borderColor: color.mono.light,
    borderWidth: spacing.xxsmall / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xsmall,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xxsmall,
  },
});
