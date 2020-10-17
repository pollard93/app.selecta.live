import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  gradient: {
    width: spacing.large,
  },
  flex: {
    flex: 1,
  },
  scrollViewWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  scrollViewInner: {
    flexGrow: 0,
    flexShrink: 0,
  },
  headingWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.xxlarge,
  },
  section: {
    flexGrow: 0,
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
  social: {
    alignSelf: 'center',
    marginTop: spacing.xxlarge + spacing.base,
    paddingHorizontal: spacing.small,
  },
  google: {
    marginTop: spacing.small,
  },
  lower: {
    flexDirection: 'row',
    marginBottom: spacing.small,
    paddingHorizontal: spacing.base,
  },
  register: {
    alignSelf: 'center',
  },
});
