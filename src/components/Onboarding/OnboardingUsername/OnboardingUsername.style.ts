import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollViewWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  headingWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xxlarge,
  },
  input: {
    flexGrow: 0,
    paddingHorizontal: spacing.small,
  },
  button: {
    marginTop: spacing.xxlarge,
  },
});
