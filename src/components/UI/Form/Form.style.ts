import { StyleSheet } from 'react-native';
import font from '../../../styles/definitions/font';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
    borderColor: color.mono.pale.light,
    borderWidth: 1,
    padding: 1,
  },
  wrapError: {
    borderColor: color.state.error,
  },
  TextInput: {
    color: color.mono.dark,
    flexGrow: 1,
    fontFamily: font.family.body('regular').fontFamily,
    fontSize: font.size.body,
    fontWeight: font.family.body('regular').fontWeight,
    padding: spacing.small,
  },
  TextArea: {
    backgroundColor: color.mono.pale.light,
    borderColor: color.mono.pale.regular,
    borderWidth: 1,
    flex: 0,
    // Required for multiline
    paddingTop: spacing.small,
  },
  SearchInput: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.mono.pale.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.small,
  },
  error: {
    backgroundColor: color.mono.pale.light,
    bottom: 0,
    color: color.state.error,
    justifyContent: 'center',
    padding: spacing.xsmall,
    position: 'absolute',
    right: spacing.small,
    top: 0,
  },
  errorText: {
    color: color.state.error,
  },

  // FilterSearch
  filterSearchWrap: {
    flexDirection: 'row',
    padding: spacing.small,
  },
  filterSearchWrapDark: {
    backgroundColor: color.mono.pale.light,
  },
  filterSearchWrapTune: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: color.mono.pale.light,
    justifyContent: 'center',
  },
  filterSearchWrapTuneDark: {
    backgroundColor: color.mono.light,
  },
  filterSearch: {
    flex: 1,
    marginLeft: spacing.small,
  },
  filterSearchDark: {
    backgroundColor: color.mono.light,
  },
});
