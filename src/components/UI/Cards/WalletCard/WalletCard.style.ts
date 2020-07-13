import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    aspectRatio: 1.7777777778,
    borderRadius: spacing.base,
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  backgroundImageWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.2,
  },
  bottom: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    opacity: 0.5,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
