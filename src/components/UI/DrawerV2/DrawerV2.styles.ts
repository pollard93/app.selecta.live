import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  inner: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
  icon: {
    tintColor: new DynamicValue(color.mono.pale.dark, color.monoDarkMode.pale.dark),
  },
});
