import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';
import font from '../../../../../styles/definitions/font';

export default StyleSheet.create({
  wrap: {
    flexGrow: 0,
    marginBottom: spacing.base,
  },
  passwordRequirements: {
    color: color.mono.pale.dark,
  },
  passwordRequirementsContent: {
    fontSize: font.size.small * 0.8,
  },
});
