import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import scalePx from '../../../utils/scalePx';

export default StyleSheet.create({
  banner: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.base,
  },
  bannerHeader: {
    color: color.mono.light,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    height: scalePx(120),
  },
  title: {
    flex: 1,
    marginRight: spacing.base,
  },
  body: {
    padding: spacing.small,
  },
  streamButton: {
    marginVertical: spacing.small,
  },
  details: {
    flexDirection: 'row',
    marginVertical: spacing.small,
  },
  detail: {
    flex: 1,
  },
  meta: {
    marginLeft: spacing.small,
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
  metrics: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.small,
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
});
