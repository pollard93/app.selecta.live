import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';
import scalePx from '../../utils/scalePx';

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xlarge,
  },
  logoWrap: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 3.078767123287671,
    justifyContent: 'center',
    marginBottom: spacing.xlarge,
    maxWidth: scalePx(300),
    width: '80%',
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
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
});
