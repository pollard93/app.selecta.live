import { StyleSheet } from 'react-native';
import scalePx from '../../../../utils/scalePx';
import color from '../../../../styles/definitions/color';
import spacing from '../../../../styles/definitions/spacing';
import shadow from '../../../../styles/definitions/shadow';

export const headerHeight = scalePx(50);
export const headerZindex = 100;

export default StyleSheet.create({
  outer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: headerZindex,
  },
  wrap: {
    backgroundColor: color.mono.light,
    borderBottomLeftRadius: headerHeight / 2,
    borderBottomRightRadius: headerHeight / 2,
    ...shadow.regular,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: headerHeight,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
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
    width: (headerHeight - spacing.large),
  },
  profilePictureInner: {
    borderRadius: (headerHeight - spacing.large) / 2,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  profilePictureIcon: {
    height: '100%',
    width: '100%',
  },
});
