/* eslint-disable camelcase */
import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  horizontalSeparator: {
    width: spacing.small,
  },

  // flatList
  flatListHORIZONTAL: {
    paddingLeft: spacing.small,
  },
  flatListHORIZONTAL_SMALL: {
    marginBottom: spacing.small,
  },

  // flatListContainer
  // eslint-disable-next-line camelcase
  flatListContainerHORIZONTAL_SMALL: {
    paddingHorizontal: spacing.small,
  },

  // horizontalArrow
  horizontalArrowWrapHORIZONTAL: {
    alignItems: 'flex-end',
    padding: spacing.small,
  },
  horizontalArrowWrapHORIZONTAL_SMALL: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: spacing.small,
    marginRight: spacing.small,
    ...StyleSheet.absoluteFillObject,
  },
  horizontalArrowHORIZONTAL_SMALL: {
    tintColor: color.mono.light,
  },

  // item
  itemHORIZONTAL: {
    paddingRight: spacing.small,
  },

  loadingHorizontal: {
    flexDirection: 'row',
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  // background
  backgroundDARK: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.dark),
  },
  backgroundLIGHT: {
    backgroundColor: new DynamicValue(color.mono.pale.light, color.mono.pale.dark),
  },
});
