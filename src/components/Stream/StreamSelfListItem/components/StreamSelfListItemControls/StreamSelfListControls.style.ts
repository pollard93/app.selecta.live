import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  topRight: {
    flexDirection: 'row',
    position: 'absolute',
    right: spacing.small,
    top: spacing.small,
  },
  centre: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  spaceBetween: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.small,
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: 'row',
  },
});
