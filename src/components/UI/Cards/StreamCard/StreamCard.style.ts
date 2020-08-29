import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    paddingBottom: spacing.small,
  },
  fillHeight: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    paddingRight: spacing.small,
  },
  image: {
    aspectRatio: 1.7777777778,
  },
  position: {
    backgroundColor: color.accent.primary,
    height: 2,
    position: 'absolute',
    top: -2,
  },
  item: {
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
  contentSpacer: {
    flexGrow: 1,
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
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: spacing.small,
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
