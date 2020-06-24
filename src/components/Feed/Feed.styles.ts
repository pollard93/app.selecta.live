import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';
import color from '../../styles/definitions/color';

export default StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  horizontalSeparator: {
    width: spacing.small,
  },

  // outerItem
  outerItemDARK: {
    backgroundColor: color.mono.pale.regular,
  },
  outerItemLIGHT: {
    backgroundColor: color.mono.light,
  },

  // flatListContainer
  // eslint-disable-next-line camelcase
  flatListContainerHORIZONTAL_SMALL: {
    padding: spacing.base,
    paddingTop: 0,
  },
});
