import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  padding: {
    paddingBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  separator: {
    height: spacing.small,
  },
  scrollViewContainer: {
    paddingVertical: spacing.small,
  },
  flatListCover: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  flatListCoverCenter: {
    alignItems: 'center',
  },
});
