import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
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

  // Skeleton
  skeletonCoverImage: {
    alignItems: 'center',
    aspectRatio: 1.7777777778,
    justifyContent: 'center',
  },
  skeletonCoverImageIcon: {
    height: scalePx(50),
    opacity: 0.1,
    tintColor: color.mono.pale.dark,
    width: scalePx(50),
  },
  skeletonProfileImage: {
    alignItems: 'center',
    borderColor: color.mono.light,
    borderWidth: spacing.xxsmall,
    justifyContent: 'center',
    marginLeft: spacing.small,
  },
  skeletonProfileImageIcon: {
    height: scalePx(25),
    opacity: 0.3,
    tintColor: color.mono.pale.dark,
    width: scalePx(25),
  },
  channelName: {
    padding: spacing.small,
    width: '60%',
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: spacing.small,
  },
  socialIcon: {
    marginRight: spacing.small,
  },
});
