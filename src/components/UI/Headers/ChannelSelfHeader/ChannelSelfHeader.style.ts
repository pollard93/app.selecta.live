import { StyleSheet } from 'react-native';
import color from '../../../../styles/definitions/color';
import spacing from '../../../../styles/definitions/spacing';
import shadow from '../../../../styles/definitions/shadow';

export default StyleSheet.create({
  wrap: {
    backgroundColor: color.accent.primary,
    ...shadow.regular,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.xsmall,
    paddingHorizontal: spacing.base,
  },
  noSafeArea: {
    paddingBottom: spacing.small,
    paddingTop: spacing.small,
  },
  back: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingRight: spacing.small,
  },
  headingWrap: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});
