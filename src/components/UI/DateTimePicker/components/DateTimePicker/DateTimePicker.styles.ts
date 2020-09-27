import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../../../styles/definitions/color';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  inner: {
    padding: spacing.small,
    paddingTop: 0,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  text: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
