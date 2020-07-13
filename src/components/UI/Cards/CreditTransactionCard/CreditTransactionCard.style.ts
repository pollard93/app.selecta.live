import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';

export default StyleSheet.create({
  createdAt: {
    marginBottom: spacing.xxsmall,
  },
  wrap: {
    flexDirection: 'row',
  },
  contentWrap: {
    flex: 1,
    padding: spacing.small,
  },
  heading: {
    marginBottom: spacing.small,
  },
  channelName: {
    alignSelf: 'flex-start',
  },
  right: {
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center',
    minWidth: '25%',
    padding: spacing.base,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
