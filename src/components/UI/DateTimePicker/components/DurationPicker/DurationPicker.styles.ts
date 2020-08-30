import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../../../styles/definitions/color';
import spacing from '../../../../../styles/definitions/spacing';
import shadow from '../../../../../styles/definitions/shadow';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.darkCover,
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inner: {
    backgroundColor: color.mono.light,
    padding: spacing.small,
    ...shadow.regular,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  pickerWrap: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    height: 200,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  inner: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
  text: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
