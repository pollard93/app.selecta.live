import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  coverImage: {
    aspectRatio: 1.7777777778,
    backgroundColor: color.mono.pale.regular,
    width: '100%',
  },
  profileImageWrap: {
    backgroundColor: color.mono.light,
    bottom: 0,
    left: spacing.small,
    position: 'absolute',
  },
  profileImageInner: {
    padding: spacing.xxsmall,
  },
  profileImage: {
    backgroundColor: color.mono.pale.regular,
    height: '100%',
    width: '100%',
  },
  form: {
    paddingBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  input: {
    borderColor: color.mono.pale.regular,
    borderWidth: 1,
  },
  infoArea: {
    height: scalePx(120),
  },
});
