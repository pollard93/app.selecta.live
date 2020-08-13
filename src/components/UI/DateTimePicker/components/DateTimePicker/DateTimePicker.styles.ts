import { StyleSheet } from 'react-native';
import color from '../../../../../styles/definitions/color';
import spacing from '../../../../../styles/definitions/spacing';
import shadow from '../../../../../styles/definitions/shadow';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.darkCover,
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inner: {
    backgroundColor: color.mono.light,
    padding: spacing.small,
    ...shadow.regular,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
});
