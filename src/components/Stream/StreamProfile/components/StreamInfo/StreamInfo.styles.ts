import { StyleSheet } from 'react-native';
import { DynamicValue, DynamicStyleSheet } from 'react-native-dynamic';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';

export default StyleSheet.create({
  info: {
    padding: spacing.small,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  info: {
    backgroundColor: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.regular),
  },
});
