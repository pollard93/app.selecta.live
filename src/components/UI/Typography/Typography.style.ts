import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import font from '../../../styles/definitions/font';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  H1: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h1,
    fontWeight: font.family.heading('bold').fontWeight,
    lineHeight: font.size.h1 + spacing.xxsmall,
  },
  H2: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h2,
    fontWeight: font.family.heading('bold').fontWeight,
    lineHeight: font.size.h2 + spacing.xxsmall,
  },
  H3: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h3,
    fontWeight: font.family.heading('bold').fontWeight,
    lineHeight: font.size.h3 + spacing.xxsmall,
  },
  H4: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontSize: font.size.h4,
    fontWeight: font.family.heading('bold').fontWeight,
    lineHeight: font.size.h4 + spacing.xxsmall,
  },
  Body: {
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('light').fontWeight,
    lineHeight: font.size.body + spacing.xxsmall,
  },
  Small: {
    fontFamily: font.family.body('light').fontFamily,
    fontSize: font.size.small,
    fontWeight: font.family.body('light').fontWeight,
    lineHeight: font.size.small + spacing.xxsmall,
  },
  bold: {
    fontFamily: font.family.heading('bold').fontFamily,
    fontWeight: font.family.heading('bold').fontWeight,
  },
  light: {
    color: color.mono.light,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  base: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
  light: {
    color: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
