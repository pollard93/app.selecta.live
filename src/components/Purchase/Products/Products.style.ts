import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.small,
  },
  dismiss: {
    alignSelf: 'flex-start',
    marginLeft: -(spacing.small),
    padding: spacing.small,
  },
  item: {
    borderColor: color.mono.light,
    borderWidth: spacing.xxsmall / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xxsmall,
  },
  list: {
    marginTop: spacing.large,
  },
  separator: {
    height: spacing.small,
  },
});
