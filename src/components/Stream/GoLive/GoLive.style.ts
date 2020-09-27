import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  authKeys: {
    borderColor: color.mono.pale.dark,
    borderWidth: scalePx(1),
    marginHorizontal: spacing.base,
    padding: spacing.xsmall,
  },
  authKey: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  authKeyBody: {
    color: color.mono.dark,
    flex: 1,
    paddingRight: spacing.small,
  },
  video: {
    aspectRatio: 1.7777777778,
    marginBottom: spacing.base,
    width: '100%',
  },
  name: {
    margin: spacing.base,
  },
  state: {
    marginBottom: spacing.base,
    marginHorizontal: spacing.base,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  authKeyBody: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
