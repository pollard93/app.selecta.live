import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  image: {
    aspectRatio: 1.7777777778,
    backgroundColor: color.mono.pale.regular,
    width: '100%',
  },
  form: {
    paddingHorizontal: spacing.small,
  },
  section: {
    marginTop: spacing.base,
  },
  settings: {
    backgroundColor: color.mono.pale.regular,
    padding: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  toggleInput: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleInputLabel: {
    marginRight: spacing.xxsmall,
  },
  button: {
    padding: spacing.small,
  },
});
