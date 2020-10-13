import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  wrap: {
    padding: spacing.small,
  },
  padding: {
    paddingBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  separator: {
    height: spacing.small,
  },
  scrollViewContainer: {
    paddingVertical: spacing.small,
  },
  selectedTags: {
    alignSelf: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.base,
  },
  tag: {
    alignItems: 'center',
    backgroundColor: color.mono.pale.regular,
    borderRadius: 2,
    flexDirection: 'row',
    marginBottom: spacing.xsmall,
    marginRight: spacing.xsmall,
    paddingHorizontal: spacing.xxsmall,
    paddingVertical: spacing.xxsmall / 2,
  },
  cross: {
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    marginLeft: spacing.xxsmall,
    padding: spacing.xxsmall / 2,
  },
  crossIcon: {
    tintColor: color.mono.light,
  },
  button: {
    paddingHorizontal: spacing.small,
  },
});
