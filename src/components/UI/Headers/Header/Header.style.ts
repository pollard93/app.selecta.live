import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import { StyleSheet } from 'react-native';
import color from '../../../../styles/definitions/color';
import spacing from '../../../../styles/definitions/spacing';
import shadow from '../../../../styles/definitions/shadow';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
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
  logoWrap: {
    aspectRatio: 4.854054054054054,
    height: '100%',
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  iconWrap: {
    aspectRatio: 1,
    height: '100%',
    marginLeft: spacing.small,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  profilePictureInner: {
    borderRadius: 200,
    borderWidth: 2,
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  profilePictureIconWrap: {
    padding: 1,
  },
  pulsingIcon: {
    position: 'absolute',
    right: 0,
    top: -(scalePx(2)),
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
  profilePictureInner: {
    borderColor: new DynamicValue(color.mono.pale.regular, color.mono.pale.light),
  },
});
