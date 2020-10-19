import { StyleSheet } from 'react-native';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  topContentWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  manageButton: {
    alignItems: 'center',
    backgroundColor: color.mono.dark,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: spacing.xsmall,
  },
  editButton: {
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.xsmall,
  },
  description: {
    marginBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  joined: {
    color: color.mono.pale.dark,
  },
});
