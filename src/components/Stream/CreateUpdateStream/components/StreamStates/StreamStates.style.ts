import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
  },
  inner: {
    flex: 1,
  },
  spacer: {
    width: spacing.small,
  },
  published: {
    marginBottom: spacing.small,
  },
});
