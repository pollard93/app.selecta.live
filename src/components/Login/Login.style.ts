import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';
import scalePx from '../../utils/scalePx';

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
  logoWrap: {
    alignItems: 'center',
    aspectRatio: 4.854054054054054,
    flexDirection: 'row',
    marginBottom: spacing.xxlarge,
    marginLeft: spacing.small,
    width: scalePx(170),
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  arrowBack: {
    marginRight: spacing.small,
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
    justifyContent: 'space-between',
    marginBottom: spacing.small,
    paddingHorizontal: spacing.base,
  },
  forgot: {
    alignSelf: 'flex-end',
  },
  register: {
    alignSelf: 'center',
  },
});
