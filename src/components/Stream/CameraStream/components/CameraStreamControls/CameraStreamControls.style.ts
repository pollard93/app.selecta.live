import { StyleSheet } from 'react-native';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  live: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  liveConsumers: {
    marginLeft: spacing.small,
  },
  status: {
    marginRight: spacing.small,
  },
});
