import { StyleSheet } from 'react-native';
import font from '../../../../../styles/definitions/font';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: color.mono.light,
    borderColor: color.mono.pale.regular,
    borderRadius: 2,
    borderWidth: 1,
    paddingVertical: spacing.xxsmall,
  },
  wrapError: {
    paddingBottom: 0,
    paddingTop: spacing.xxsmall * 2,
  },

  input: {
    color: color.mono.dark,
    flexGrow: 1,
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
  },

  error: {
    color: color.state.error,
    justifyContent: 'center',
    left: spacing.small,
    position: 'absolute',
    top: spacing.xxsmall,
  },
  errorText: {
    color: color.state.error,
  },

  disabled: {
    opacity: 0.5,
  },
});
