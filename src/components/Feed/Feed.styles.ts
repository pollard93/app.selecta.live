/* eslint-disable camelcase */
import { StyleSheet } from 'react-native';
import spacing from '../../styles/definitions/spacing';
import color from '../../styles/definitions/color';
import { headerHeight } from '../UI/Headers/FeedHeader/FeedHeader.style';

export default StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
  },
  horizontalSeparator: {
    width: spacing.small,
  },

  flatlistContainer: {
    paddingTop: headerHeight,
  },

  // background
  backgroundDARK: {
    backgroundColor: color.mono.pale.light,
  },
  backgroundLIGHT: {
    backgroundColor: color.mono.light,
  },

  // flatList
  flatListHORIZONTAL: {
    paddingLeft: spacing.base,
  },
  flatListHORIZONTAL_SMALL: {
    marginBottom: spacing.base,
  },

  // flatListContainer
  // eslint-disable-next-line camelcase
  flatListContainerHORIZONTAL_SMALL: {
    paddingHorizontal: spacing.base,
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
});
