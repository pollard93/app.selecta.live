import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  inputWrap: {
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
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.dark),
    borderColor: new DynamicValue(color.mono.pale.regular, color.mono.lightCover),
  },
  input: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.dark),
  },
});
