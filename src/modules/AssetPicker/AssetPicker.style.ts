import { StyleSheet } from 'react-native';
import color from '../../styles/definitions/color';
import spacing from '../../styles/definitions/spacing';

export default StyleSheet.create({
  shroudStyles: {
    backgroundColor: color.mono.dark.color().alpha(0.9).toString(),
  },
  imageWrap: {
    padding: 2,
  },
  iconWrap: {
    backgroundColor: color.mono.darkCover,
    padding: spacing.xxsmall,
    position: 'absolute',
    right: spacing.small,
    top: spacing.small,
  },
  icon: {
    tintColor: color.accent.primary,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  multiSelectWrap: {
    margin: spacing.small,
  },
  footer: {
    padding: spacing.small,
  },
});
