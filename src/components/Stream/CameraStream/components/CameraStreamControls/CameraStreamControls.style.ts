import { StyleSheet } from 'react-native';
import color from '../../../../../styles/definitions/color';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  liveWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  live: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  liveConsumers: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: color.accent.primary,
    borderRadius: 2,
    flexDirection: 'row',
    marginLeft: spacing.small,
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
  },
  liveConsumersIcon: {
    marginRight: spacing.xsmall,
  },
});
