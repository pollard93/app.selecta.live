import { StyleSheet } from 'react-native';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export const headerHeight = scalePx(55);

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.pale.light,
    flex: 1,
  },
  coverImageWrap: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
  },
  coverImageCover: {
    backgroundColor: color.mono.darkCover,
    ...StyleSheet.absoluteFillObject,
  },
  headerWrap: {
    justifyContent: 'flex-end',
    left: 0,
    paddingHorizontal: spacing.small,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  headerTop: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImageWrap: {
    backgroundColor: color.mono.light,
    bottom: 0,
    position: 'absolute',
  },
  profileImageInner: {
    padding: spacing.xxsmall,
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  headerTopContent: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTopContentIcon: {
    marginRight: spacing.xsmall,
  },
  title: {
    flexDirection: 'row',
    maxWidth: '60%',
    paddingVertical: spacing.xsmall,
  },
  description: {
    paddingHorizontal: spacing.small,
  },
});
