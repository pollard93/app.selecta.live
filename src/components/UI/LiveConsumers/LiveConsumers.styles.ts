import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  liveConsumers: {
    alignItems: 'center',
    backgroundColor: color.accent.primary,
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
  },
  liveConsumersIcon: {
    marginRight: spacing.xsmall,
  },
});
