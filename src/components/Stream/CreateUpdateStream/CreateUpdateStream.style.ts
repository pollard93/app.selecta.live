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
    marginVertical: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  toggleInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleInputLabel: {
    marginRight: spacing.xxsmall,
  },
  button: {
    padding: spacing.small,
  },
});
