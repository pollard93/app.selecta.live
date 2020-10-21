import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import shadow from '../../../styles/definitions/shadow';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  outer: {
    ...shadow.regular,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
  },
  SUCCESS: {
    backgroundColor: color.accent.primary,
  },
  ERROR: {
    backgroundColor: color.state.error,
  },
});


export const DynamicStyles = new DynamicStyleSheet({
  INFO: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
