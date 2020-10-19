import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    paddingBottom: spacing.small,
  },
  imageWrap: {
    aspectRatio: 1.7777777778,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  item: {
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
