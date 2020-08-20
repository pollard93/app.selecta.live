import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.mono.light,
  },
  banner: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.small,
  },
  bannerHeader: {
    color: color.mono.light,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    maxWidth: '60%',
    paddingRight: spacing.base,
  },
  image: {
    aspectRatio: 1.777777777777778,
    flex: 1,
  },
  body: {
    padding: spacing.small,
  },
  streamButton: {
    marginVertical: spacing.small,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.small,
  },
  detail: {
    flex: 1,
    maxWidth: '60%',
    paddingRight: spacing.base,
  },
  meta: {
    flex: 1,
  },
  authKeys: {
    borderColor: color.mono.pale.dark,
    borderWidth: scalePx(1),
    padding: spacing.xsmall,
  },
  authKey: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  authKeyBody: {
    flex: 1,
    paddingRight: spacing.small,
  },
  metrics: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
  },
  metric: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  metricBody: {
    marginLeft: spacing.xsmall,
    textDecorationColor: color.mono.pale.dark,
    textDecorationLine: 'underline',
  },

  // Skeleton
  bannerHeaderSkeleton: {
    color: color.mono.dark,
  },
  skeletonImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeletonImage: {
    height: scalePx(50),
    opacity: 0.1,
    tintColor: color.mono.pale.dark,
    width: scalePx(50),
  },
});
