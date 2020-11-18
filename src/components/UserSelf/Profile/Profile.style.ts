import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../styles/definitions/spacing';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.small,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingRight: {
    flex: 1,
    paddingLeft: spacing.base,
  },
  editable: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xsmall,
  },
  contact: {
    marginLeft: spacing.xsmall,
  },
  icon: {
    opacity: 0.5,
  },
  item: {
    marginTop: spacing.base,
  },
  password: {
    marginTop: spacing.xsmall,
  },
  textItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  textItemInner: {
    flex: 1,
    marginLeft: spacing.xsmall,
  },
  channels: {
    marginVertical: spacing.base,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  password: {
    color: new DynamicValue(color.mono.dark, color.mono.light),
  },
});
