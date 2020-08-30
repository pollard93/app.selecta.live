import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../definitions/color';

export default StyleSheet.create({
  PageFill: {
    flex: 1,
    width: '100%',
  },
  MaxWidth: {
    alignSelf: 'center',
    width: '90%',
  },
});


export const GlobalDynamicStyles = new DynamicStyleSheet({
  background: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.monoDarkMode.pale.light),
  },
  skeleton: {
    backgroundColor: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.dark),
    color: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.dark),
  },
});
