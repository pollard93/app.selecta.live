import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  /**
   * Wrap
   */
  wrap: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.small,
  },
  disabled: {
    opacity: 0.5,
  },
  SECONDARY: {
    backgroundColor: color.mono.dark,
  },
  LIGHT: {
    backgroundColor: color.mono.light,
  },
  FB: {
    backgroundColor: color.brands.facebook,
  },
  GOOGLE: {
    backgroundColor: color.brands.google,
  },


  /**
   * Text
   */
  text: {
    color: color.mono.light,
  },
  textLIGHT: {
    color: color.mono.dark,
  },


  /**
   * Icon and loading
   */
  icon: {
    marginLeft: spacing.small,
    tintColor: color.mono.light,
  },
  loading: {
    marginLeft: spacing.small,
  },


  /**
   * Size
   */
  small: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xxsmall,
  },
  touchsmall: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});
