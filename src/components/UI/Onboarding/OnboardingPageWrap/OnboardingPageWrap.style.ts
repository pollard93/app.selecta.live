import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  heading: {
    borderBottomLeftRadius: scalePx(25),
    borderBottomRightRadius: scalePx(25),
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.base,
  },
  logoWrap: {
    aspectRatio: 1,
    marginBottom: spacing.xsmall,
    width: scalePx(40),
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  content: {
    flex: 1,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.pale.dark),
  },
  heading: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.dark),
  },
});
