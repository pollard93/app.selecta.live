import { StyleSheet } from 'react-native';
import color from '../../../../../styles/definitions/color';
import spacing from '../../../../../styles/definitions/spacing';

export default StyleSheet.create({
  cover: {
    alignItems: 'center',
    backgroundColor: color.mono.darkCover,
    justifyContent: 'center',
  },
  playPause: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoEnabled: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: { tintColor: color.mono.light },
  bottomWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bottomWrapFullScreen: {
    padding: spacing.base,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.small,
  },
  timesFullScreen: {
    paddingHorizontal: 0,
  },
  liveWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  live: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.small,
  },
  error: {
    color: color.mono.light,
  },
});
