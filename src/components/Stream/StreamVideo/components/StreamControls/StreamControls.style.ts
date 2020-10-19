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
    justifyContent: 'space-between',
  },
  live: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.small,
  },
  liveConsumers: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: color.accent.primary,
    borderRadius: 2,
    flexDirection: 'row',
    marginLeft: spacing.small,
    marginTop: spacing.small,
    paddingHorizontal: spacing.xsmall,
    paddingVertical: spacing.xxsmall,
  },
  liveConsumersIcon: {
    marginRight: spacing.xsmall,
  },
});
