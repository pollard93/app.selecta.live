import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingHorizontal: spacing.small,
  },
  profilePictureWrap: {
    aspectRatio: 1,
    marginRight: spacing.small,
    marginTop: spacing.xxsmall,
    width: scalePx(26),
  },
  channelTick: {
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: scalePx(12) / 2,
    bottom: 0,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    width: scalePx(12),
  },
  commentOuter: {
    flex: 1,
  },
  commentWrap: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  comment: {
    flexWrap: 'wrap',
  },
  lower: {
    flexDirection: 'row',
    marginBottom: spacing.xxsmall,
  },
  time: {
    marginLeft: spacing.small,
  },
});
