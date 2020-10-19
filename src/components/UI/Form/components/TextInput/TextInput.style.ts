import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import font from '../../../../../styles/definitions/font';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    borderRadius: 2,
    borderWidth: 1,
    paddingVertical: spacing.xxsmall,
  },
  // eslint-disable-next-line react-native/no-color-literals
  wrapOnboarding: {
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderRadius: 0,
    borderWidth: 0,
    paddingVertical: spacing.xxsmall,
  },
  showingLabel: {
    paddingBottom: 0,
    paddingTop: spacing.xxsmall * 2,
  },

  input: {
    flexGrow: 1,
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
  },
  inputOnboarding: {
    paddingHorizontal: 0,
    paddingVertical: spacing.small,
  },

  label: {
    justifyContent: 'center',
    left: spacing.small,
    position: 'absolute',
    top: spacing.xxsmall,
  },
  labelOnboarding: {
    left: 0,
  },
  labelText: {
    color: color.mono.pale.dark,
  },
  error: {
    color: color.state.error,
  },

  disabled: {
    opacity: 0.5,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.monoDarkMode.pale.dark),
    borderColor: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.regular),
  },
  wrapOnboarding: {
    borderColor: new DynamicValue(color.mono.dark, color.mono.light),
  },
  input: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
