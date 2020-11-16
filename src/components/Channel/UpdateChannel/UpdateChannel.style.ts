import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';
import spacing from '../../../styles/definitions/spacing';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

export default StyleSheet.create({
  coverImage: {
    width: '100%',
    ...GlobalStyles.AspectRatio,
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
