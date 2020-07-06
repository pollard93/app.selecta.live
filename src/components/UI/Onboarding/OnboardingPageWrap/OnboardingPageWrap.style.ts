import { StyleSheet } from 'react-native';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';
import scalePx from '../../../../utils/scalePx';

export default StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  wrap: {
    backgroundColor: color.mono.pale.light,
  },
  heading: {
    backgroundColor: color.mono.light,
    borderBottomLeftRadius: scalePx(25),
    borderBottomRightRadius: scalePx(25),
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.base,
  },
  logoWrap: {
    aspectRatio: 1,
    marginBottom: spacing.xsmall,
    width: scalePx(40),
  },
  logo: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  content: {
    flex: 1,
  },
});
