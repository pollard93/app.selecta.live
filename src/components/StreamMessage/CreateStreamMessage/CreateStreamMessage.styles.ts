import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: color.mono.light,
    borderTopColor: color.mono.pale.dark,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  input: {
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
