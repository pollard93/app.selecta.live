import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';
import scalePx from '../../utils/scalePx';

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrap: {
    alignSelf: 'center',
    aspectRatio: 2.7058823529411766,
    marginBottom: spacing.xxlarge,
    maxWidth: scalePx(300),
    width: '80%',
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  input: {
    flexGrow: 0,
    marginBottom: spacing.small,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.xsmall,
  },
  register: {
    alignSelf: 'center',
  },
});
