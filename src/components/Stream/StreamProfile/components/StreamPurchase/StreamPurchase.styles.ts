import { StyleSheet } from 'react-native';
import { DynamicValue, DynamicStyleSheet } from 'react-native-dynamic';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';
import scalePx from '../../../../../utils/scalePx';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  info: {
    backgroundColor: color.mono.pale.regular,
    padding: spacing.small,
  },
  buy: {
    padding: spacing.small,
  },
  ticket: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
    padding: spacing.base,
    zIndex: -1,
  },
  corner: {
    borderRadius: scalePx(15),
    height: scalePx(30),
    left: -scalePx(15),
    position: 'absolute',
    top: -scalePx(15),
    width: scalePx(30),
  },
  bottom: {
    bottom: -scalePx(15),
    top: null,
  },
  right: {
    left: null,
    right: -scalePx(15),
  },
  bottomRight: {
    bottom: -scalePx(15),
    left: null,
    right: -scalePx(15),
    top: null,
  },
  ticketInfo: {
    justifyContent: 'center',
  },
  cost: {
    borderLeftWidth: 1,
    paddingLeft: spacing.small,
    paddingRight: spacing.xxsmall,
    paddingVertical: spacing.large,
  },
  lower: {
    padding: spacing.small,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  ticket: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
  cost: {
    borderLeftColor: new DynamicValue(color.mono.dark.color().alpha(0.2).string(), color.mono.light.color().alpha(0.2).string()),
  },
});
