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
  profilePicture: {
    aspectRatio: 1,
    borderColor: color.mono.light,
    borderRadius: scalePx(26) / 2,
    borderWidth: 2,
    marginRight: spacing.small,
    overflow: 'hidden',
    width: scalePx(26),
  },
  commentOuter: {
    flex: 1,
  },
  commentWrap: {
    alignSelf: 'flex-start',
    backgroundColor: color.mono.light,
    borderBottomLeftRadius: 0,
    borderRadius: scalePx(20),
    overflow: 'hidden',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xxsmall,
  },
  comment: {
    color: color.mono.dark,
    flexWrap: 'wrap',
  },
  commentSelf: {
    color: color.mono.light,
  },
});
