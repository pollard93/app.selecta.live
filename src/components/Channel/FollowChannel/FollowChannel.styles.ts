import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
  },
  icon: {
    marginLeft: spacing.xsmall,
    tintColor: color.mono.light,
  },
});
