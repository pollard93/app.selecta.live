import { StyleSheet } from 'react-native';
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
