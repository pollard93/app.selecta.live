import { Dimensions, StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../definitions/color';

export default StyleSheet.create({
  PageFill: {
    flex: 1,
    width: '100%',
  },
  MaxWidth: {
    alignSelf: 'center',
    maxWidth: Math.min(Dimensions.get('screen').width, 600),
  },
  AspectRatio: {
    aspectRatio: Dimensions.get('screen').width > 600 ? 2.39 : 1.7777777778,
  },
  ImageCircleBorderInner: {
    borderRadius: 1000,
    borderWidth: 2,
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  CostText: {
    alignItems: 'center',
    flexDirection: 'row',
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
  ImageCircleBorderInner: {
    borderColor: new DynamicValue(color.mono.pale.regular, color.mono.pale.light),
  },
});
