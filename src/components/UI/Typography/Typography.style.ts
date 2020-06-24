import { StyleSheet } from 'react-native';
import font from '../../../styles/definitions/font';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  H1: {
    fontFamily: font.family.body('bold').fontFamily,
    fontSize: font.size.h1,
    fontWeight: font.family.body('bold').fontWeight,
  },
  H2: {
    fontFamily: font.family.body('bold').fontFamily,
    fontSize: font.size.h2,
    fontWeight: font.family.body('bold').fontWeight,
  },
  H3: {
    fontFamily: font.family.body('semibold').fontFamily,
    fontSize: font.size.h3,
    fontWeight: font.family.body('semibold').fontWeight,
  },
  H4: {
    fontFamily: font.family.body('regular').fontFamily,
    fontSize: font.size.h4,
    fontWeight: font.family.body('regular').fontWeight,
  },
  Body: {
    fontFamily: font.family.body('regular').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('regular').fontWeight,
  },
  Small: {
    fontFamily: font.family.body('regular').fontFamily,
    fontSize: font.size.small,
    fontWeight: font.family.body('regular').fontWeight,
  },
  light: {
    color: color.mono.light,
  },
});
