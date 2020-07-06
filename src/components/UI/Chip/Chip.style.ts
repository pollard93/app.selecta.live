import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';
import font from '../../../styles/definitions/font';

export default StyleSheet.create({
  /**
   * Wrap
   */
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapSECONDARY: {
    backgroundColor: color.mono.dark,
  },
  wrapLIGHT: {
    backgroundColor: color.mono.light,
  },
  wrapSKELETON: {
    backgroundColor: color.mono.pale.light,
  },


  /**
   * Text
   */
  text: {
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
  },
  textPRIMARY: {
    color: color.mono.light,
  },
  textSECONDARY: {
    color: color.mono.light,
  },
  textLIGHT: {
    color: color.mono.dark,
  },
  textSKELETON: {
    color: color.mono.pale.light,
  },
  bold: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontWeight: font.family.heading('bold').fontWeight,
  },
});
