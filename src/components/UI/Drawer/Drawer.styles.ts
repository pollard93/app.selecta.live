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
    alignSelf: 'stretch',
    borderTopWidth: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  bar: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
    borderColor: new DynamicValue(color.mono.pale.regular, color.mono.lightCover),
  },
  icon: {
    tintColor: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
