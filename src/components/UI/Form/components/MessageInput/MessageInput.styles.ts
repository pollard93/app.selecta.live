import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  inputWrap: {
    borderWidth: 0,
    flex: 1,
  },
  send: {
    margin: spacing.small,
    tintColor: color.accent.primary,
  },
  sendDisabled: {
    opacity: 0.5,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.monoDarkMode.pale.dark),
    borderColor: new DynamicValue(color.mono.pale.regular, color.mono.lightCover),
  },
});
