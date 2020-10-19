import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';

export default StyleSheet.create({
  coverImage: {
    aspectRatio: 1.7777777778,
    backgroundColor: color.mono.pale.regular,
    width: '100%',
  },
  profileImageWrap: {
    backgroundColor: color.mono.light,
    bottom: 0,
    left: spacing.small,
    position: 'absolute',
  },
  profileImageInner: {
    padding: spacing.xxsmall,
  },
  profileImage: {
    backgroundColor: color.mono.pale.regular,
    height: '100%',
    width: '100%',
  },
  form: {
    paddingBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  button: {
    padding: spacing.small,
  },
  section: {
    marginTop: spacing.base,
  },
  tagsHeading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tagsButton: {
    marginLeft: spacing.small,
  },
  tags: {
    marginTop: spacing.small,
  },
});
