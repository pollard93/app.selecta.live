import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  separator: {
    height: 1,
    opacity: 0.5,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  separator: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
