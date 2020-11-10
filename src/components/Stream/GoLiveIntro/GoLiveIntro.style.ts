import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  loadingError: {
    justifyContent: 'center',
  },
  wrap: {
    justifyContent: 'space-between',
  },
  heading: {
    alignItems: 'center',
    aspectRatio: 1.2,
    justifyContent: 'center',
  },
  headingImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  headingImage: {
    height: '60%',
    maxWidth: scalePx(200),
    opacity: 0.2,
    tintColor: color.mono.light,
    width: '60%',
  },
  lower: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.large,
  },
  button: {
    marginTop: spacing.large,
  },
});
