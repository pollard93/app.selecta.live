import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  loadingError: {
    justifyContent: 'center',
  },
  scrollViewContainer: {
    minHeight: '100%',
  },
  wrap: {
    justifyContent: 'space-between',
  },
  heading: {
    alignItems: 'center',
    aspectRatio: 1.2,
    justifyContent: 'center',
  },
  headingImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  headingImage: {
    height: '60%',
    maxWidth: scalePx(200),
    opacity: 0.2,
    tintColor: color.mono.light,
    width: '60%',
  },
  headingImageDark: {
    tintColor: color.mono.dark,
  },
  lower: {
    flexShrink: 0,
    padding: spacing.large,
  },
  lowerCenter: {
    alignItems: 'center',
  },
  authKey: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
  },
  authKeyCopy: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.mono.light,
    flexDirection: 'row',
    flex: 1,
    padding: spacing.xsmall,
    maxWidth: '70%',
  },
  authKeyBody: {
    color: color.mono.dark,
    flex: 1,
    paddingRight: spacing.small,
    paddingVertical: 0,
  },
  copyIcon: {
    tintColor: color.mono.dark,
  },
  instructions: {
    marginTop: spacing.small,
  },
  video: {
    aspectRatio: 1.7777777778,
    backgroundColor: color.mono.dark,
    marginVertical: spacing.base,
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    marginTop: spacing.large,
  },
  itemText: {
    textAlign: 'center',
  },
  itemInput: {
    alignSelf: 'stretch',
  },
});
