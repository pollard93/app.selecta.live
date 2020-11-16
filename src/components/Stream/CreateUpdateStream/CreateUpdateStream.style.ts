import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

export default StyleSheet.create({
  image: {
    width: '100%',
    ...GlobalStyles.AspectRatio,
  },
  form: {
    paddingHorizontal: spacing.small,
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
  afterTags: {
    marginTop: spacing.small,
  },
  settings: {
    padding: spacing.small,
  },
  inputWrap: {
    marginTop: spacing.small,
  },
  toggleInput: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleInputLabel: {
    marginRight: spacing.xxsmall,
  },
  button: {
    padding: spacing.small,
  },
  disabled: {
    opacity: 0.5,
  },
});


export const DynamicStyles = new DynamicStyleSheet({
  settings: {
    backgroundColor: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.dark),
  },
});
