import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.small,
  },
  heading: {
    marginVertical: spacing.small,
  },
  dismiss: {
    alignSelf: 'flex-start',
    marginLeft: -(spacing.small),
    padding: spacing.small,
  },
});
