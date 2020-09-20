import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.mono.dark,
  },
  container: {
    alignSelf: 'center',
    width: '80%',
  },
  inner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dismiss: {
    left: spacing.small,
    position: 'absolute',
    top: spacing.small,
  },
  dismissIcon: {
    tintColor: color.mono.light,
  },
  button: {
    marginTop: spacing.large,
  },
  text: {
    color: color.mono.light,
    marginTop: spacing.base,
    textAlign: 'center',
  },
});
