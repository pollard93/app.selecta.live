import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  toggleWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: spacing.small,
    top: spacing.small,
  },
  toggle: {
    marginHorizontal: spacing.small,
  },
});
