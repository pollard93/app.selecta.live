import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  cover: {
    backgroundColor: color.mono.lightCover,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    alignSelf: 'center',
    marginTop: spacing.small,
    width: '80%',
  },
});
