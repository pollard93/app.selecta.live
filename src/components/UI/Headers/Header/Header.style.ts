import { StyleSheet } from 'react-native';
import color from '../../../../styles/definitions/color';
import spacing from '../../../../styles/definitions/spacing';
import shadow from '../../../../styles/definitions/shadow';

export default StyleSheet.create({
  outer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrap: {
    backgroundColor: color.mono.light,
    opacity: 0.5,
    ...shadow.regular,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.xsmall,
    paddingHorizontal: spacing.base,
  },
  noSafeArea: {
    paddingBottom: spacing.small,
    paddingTop: spacing.small,
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  back: {
    marginRight: spacing.small,
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  wallet: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: spacing.small,
  },
  walletIcon: {
    marginRight: spacing.xxsmall,
  },
  logoWrap: {
    aspectRatio: 4.22972972972973,
    height: '100%',
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  profilePicture: {
    aspectRatio: 1,
    height: '100%',
  },
  profilePictureInner: {
    borderRadius: 200,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  profilePictureIcon: {
    height: '100%',
    width: '100%',
  },
});
