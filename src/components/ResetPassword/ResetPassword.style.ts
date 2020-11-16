import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollViewWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.base,
    width: '100%',
  },
  headingWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xlarge,
  },
  section: {
    flexGrow: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.small,
  },
  input: {
    paddingRight: spacing.xlarge,
  },
  arrow: {
    bottom: 0,
    justifyContent: 'center',
    paddingRight: spacing.xsmall,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  arrowBack: {
    marginRight: spacing.small,
  },
});
