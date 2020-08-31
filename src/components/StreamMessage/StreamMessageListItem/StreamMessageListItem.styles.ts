import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.small,
  },
  profilePictureWrap: {
    aspectRatio: 1,
    marginRight: spacing.small,
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
  messageOuter: {
    flex: 1,
  },
  messageWrap: {
    alignSelf: 'flex-start',
    backgroundColor: color.mono.light,
    borderBottomLeftRadius: 0,
    borderRadius: scalePx(10),
    overflow: 'hidden',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xxsmall,
  },
  message: {
    color: color.mono.dark,
    flexWrap: 'wrap',
  },
  messageSelf: {
    color: color.mono.light,
  },
  time: {
    marginTop: spacing.xxsmall,
  },
});
