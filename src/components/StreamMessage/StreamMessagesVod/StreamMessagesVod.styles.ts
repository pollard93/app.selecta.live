import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  separator: {
    height: spacing.small,
  },
  contentContainer: {
    paddingVertical: spacing.small,
  },
});
