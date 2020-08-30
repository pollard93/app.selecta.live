import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  /**
   * Wrap
   */
  wrap: {
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wrapSECONDARY: {
    backgroundColor: color.mono.dark,
  },
  wrapLIGHT: {
    backgroundColor: color.mono.light,
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
});
