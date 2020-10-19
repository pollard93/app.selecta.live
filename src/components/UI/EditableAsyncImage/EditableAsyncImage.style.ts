import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  controls: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 100,
  },
  loadingWrap: {
    backgroundColor: color.mono.darkCover,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: spacing.small,
    paddingRight: spacing.small,
  },
  icon: {
    backgroundColor: color.mono.darkCover,
    borderRadius: 2,
    margin: spacing.xxsmall,
    padding: spacing.xxsmall / 2,
  },
  loading: {
    backgroundColor: color.mono.darkCover,
  },
});
