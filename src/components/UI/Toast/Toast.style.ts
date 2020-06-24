import { StyleSheet } from 'react-native';
import shadow from '../../../styles/definitions/shadow';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  outer: {
    ...shadow.regular,
  },
  inner: {
    padding: spacing.base,
  },
  INFO: {
    backgroundColor: color.mono.light,
  },
  SUCCESS: {
    backgroundColor: color.accent.primary,
  },
  ERROR: {
    backgroundColor: color.state.error,
  },
});
