import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
  },
  goLive: {
    alignItems: 'center',
    backgroundColor: color.mono.darkCover,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  goLiveText: {
    marginRight: spacing.small,
  },
});
