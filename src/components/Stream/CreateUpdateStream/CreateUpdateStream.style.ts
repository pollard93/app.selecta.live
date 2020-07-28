import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  form: {
    paddingHorizontal: spacing.small,
  },
  infoArea: {
    height: scalePx(120),
  },
  section: {
    marginVertical: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  input: {
    borderColor: color.mono.pale.regular,
    borderWidth: 1,
  },
  toggleInput: {
    flexDirection: 'row',
  },
  toggleInputLabel: {
    marginRight: spacing.xxsmall,
  },
});
