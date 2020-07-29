import { StyleSheet } from 'react-native';
import font from '../../../styles/definitions/font';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
    borderColor: color.mono.pale.regular,
    borderWidth: 1,
    paddingVertical: spacing.xxsmall,
  },
  wrapError: {
    paddingBottom: 0,
    paddingTop: spacing.xxsmall * 2,
  },
  light: {
    backgroundColor: color.mono.light,
  },

  // Inputs
  TextInput: {
    color: color.mono.dark,
    flexGrow: 1,
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
  },
  TextArea: {
    flex: 0,
    flexGrow: 0,
    // Required for multiline
    paddingTop: spacing.small,
    minHeight: scalePx(120),
  },
  SearchInput: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.small,
  },

  // Error
  error: {
    color: color.state.error,
    justifyContent: 'center',
    left: spacing.small,
    position: 'absolute',
    top: spacing.xxsmall,
  },
  errorLight: {
    backgroundColor: color.mono.light,
  },
  errorText: {
    color: color.state.error,
  },
});
