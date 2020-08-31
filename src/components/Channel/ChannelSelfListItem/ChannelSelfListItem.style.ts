import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: spacing.small,
  },
  cover: {
    backgroundColor: color.mono.darkCover,
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    aspectRatio: 1,
    width: '20%',
  },
  name: {
    flex: 1,
    marginLeft: spacing.base,
  },
});
