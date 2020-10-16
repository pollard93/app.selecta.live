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
    aspectRatio: 4.854054054054054,
    marginBottom: spacing.xxlarge,
    marginLeft: spacing.small,
    maxWidth: scalePx(300),
    width: '70%',
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  input: {
    flexGrow: 0,
    paddingHorizontal: spacing.small,
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
    marginTop: spacing.xxlarge,
    paddingHorizontal: spacing.small,
  },
  google: {
    marginTop: spacing.small,
  },
  lower: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.xsmall,
    paddingHorizontal: spacing.small,
  },
  register: {
    alignSelf: 'center',
    marginBottom: spacing.base,
  },
});
