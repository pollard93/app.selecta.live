import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';
import scalePx from '../../../../../utils/scalePx';

export default StyleSheet.create({
  input: {
    flex: 0,
    flexGrow: 0,
    // Required for multiline
    paddingTop: spacing.small,
    minHeight: scalePx(120),
  },
});
