import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
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
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingRight: spacing.small,
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
    borderColor: color.mono.light,
    borderRadius: 200,
    borderWidth: 2,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  profilePictureIcon: {
    height: '100%',
    width: '100%',
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
