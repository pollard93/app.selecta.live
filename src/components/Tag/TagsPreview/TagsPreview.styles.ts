import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  tags: {
    maxHeight: scalePx(200),
  },
  tagsInner: {
    alignSelf: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    marginBottom: spacing.xsmall,
    marginRight: spacing.xsmall,
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
  },
  text: {
    color: color.mono.dark,
  },
  cross: {
    borderRadius: 100,
    marginRight: spacing.xxsmall,
    padding: spacing.xxsmall / 2,
  },
  crossIcon: {
    tintColor: color.mono.light,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  tag: {
    backgroundColor: new DynamicValue(color.mono.dark, color.mono.light),
  },
  cross: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
  text: {
    color: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
