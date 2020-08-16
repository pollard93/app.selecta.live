import { StyleSheet } from 'react-native';
import font from '../../../../../styles/definitions/font';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';
import scalePx from '../../../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flexGrow: 0,
  },
  newInput: {
    width: '100%',
  },
  cross: {
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    padding: spacing.xxsmall / 2,
  },
  crossIcon: {
    tintColor: color.mono.light,
  },
});
