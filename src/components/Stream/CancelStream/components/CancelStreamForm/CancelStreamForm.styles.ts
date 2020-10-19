import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.darkCover,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  inner: {
    paddingHorizontal: spacing.small,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.small,
  },
  button: {
    marginTop: spacing.small,
  },
});
