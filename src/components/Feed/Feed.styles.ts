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

  // flatListContainer
  // eslint-disable-next-line camelcase
  flatListContainerHORIZONTAL_SMALL: {
    padding: spacing.base,
    paddingTop: 0,
  },
  flatListContainerHORIZONTAL: {
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
    ...StyleSheet.absoluteFillObject,
    marginRight: spacing.small,
  },
  horizontalArrowHORIZONTAL_SMALL: {
    tintColor: color.mono.light,
  },
});
