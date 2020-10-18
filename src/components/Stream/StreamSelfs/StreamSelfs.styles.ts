import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  item: {
    marginBottom: spacing.small,
    width: '100%',
  },
  createButton: {
    marginTop: spacing.small,
    width: scalePx(160),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.base,
  },
});
