import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    paddingBottom: spacing.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  // Skeleton
  skeletonImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonEmpty: {
    opacity: 0.5,
  },
  skeletonImage: {
    height: scalePx(50),
    opacity: 0.1,
    tintColor: color.mono.pale.dark,
    width: scalePx(50),
  },
  skeletonTags: {
    alignSelf: 'flex-start',
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
