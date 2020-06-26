import { StyleSheet } from 'react-native';
import font from '../../../styles/definitions/font';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
  },
  light: {
    backgroundColor: color.mono.light,
  },

  TextInput: {
    color: color.mono.dark,
    flexGrow: 1,
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
    padding: spacing.small,
  },
  TextArea: {
    backgroundColor: color.mono.pale.light,
    borderColor: color.mono.pale.regular,
    borderWidth: 1,
    flex: 0,
    flexGrow: 0,
    // Required for multiline
    paddingTop: spacing.small,
  },
  SearchInput: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.small,
  },
  error: {
    backgroundColor: color.mono.pale.light,
    bottom: 0,
    color: color.state.error,
    justifyContent: 'center',
    padding: spacing.xsmall,
    position: 'absolute',
    right: spacing.small,
    top: 0,
  },
  errorText: {
    color: color.state.error,
  },
});
