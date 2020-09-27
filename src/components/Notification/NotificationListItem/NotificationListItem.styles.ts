import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.small,
  },
  read: {
    opacity: 0.5,
  },
  pulse: {
    marginLeft: spacing.small,
    width: scalePx(10),
  },
  image: {
    aspectRatio: 1,
    marginRight: spacing.small,
    width: scalePx(50),
  },
  content: {
    flex: 1,
  },
  skeletonContentWrap: {
    paddingVertical: spacing.base,
  },
  skeletonImageWrap: {
    alignItems: 'center',
    borderRadius: 1000,
    justifyContent: 'center',
  },
  skeletonImage: {
    height: scalePx(25),
    opacity: 0.1,
    overflow: 'hidden',
    tintColor: color.mono.pale.dark,
    width: scalePx(25),
  },
});
