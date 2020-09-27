import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contentWrap: {
    marginTop: spacing.large,
  },
  content: {
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: spacing.large,
  },
});
