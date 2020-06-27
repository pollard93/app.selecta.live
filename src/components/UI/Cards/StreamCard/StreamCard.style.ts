import { StyleSheet } from 'react-native';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.light,
    paddingBottom: spacing.small,
  },
  image: {
    aspectRatio: 1.7777777778,
  },
  item: {
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
  tagSeparator: {
    width: spacing.xxsmall,
  },
  lower: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  channelNameChip: {
    marginRight: spacing.small,
  },
  chips: {
    flexDirection: 'row',
  },
  chipLeft: {
    marginRight: spacing.xsmall,
  },

});
