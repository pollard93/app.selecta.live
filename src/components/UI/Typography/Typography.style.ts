import { StyleSheet } from 'react-native';
import font from '../../../styles/definitions/font';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  H1: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h1,
    fontWeight: font.family.heading('bold').fontWeight,
  },
  H2: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h2,
    fontWeight: font.family.heading('bold').fontWeight,
  },
  H3: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h3,
    fontWeight: font.family.heading('bold').fontWeight,
  },
  H4: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h4,
    fontWeight: font.family.heading('bold').fontWeight,
  },
  Body: {
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
  },
  Small: {
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.small,
    fontWeight: font.family.body('light').fontWeight,
  },
  light: {
    color: color.mono.light,
  },
  bold: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontWeight: font.family.heading('bold').fontWeight,
  },
});
