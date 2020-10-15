import { StyleSheet } from 'react-native';
import { DynamicValue, DynamicStyleSheet } from 'react-native-dynamic';
import spacing from '../../../../../styles/definitions/spacing';
import color from '../../../../../styles/definitions/color';
import scalePx from '../../../../../utils/scalePx';

export default StyleSheet.create({
  info: {
    padding: spacing.small,
  },
  buy: {
    padding: spacing.small,
  },
  ticket: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.small,
    zIndex: -1,
  },
  ticketInfo: {
    borderBottomLeftRadius: scalePx(15),
    borderColor: color.accent.primary,
    borderRightWidth: 0,
    borderTopLeftRadius: scalePx(15),
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: spacing.base,
  },
  cost: {
    borderBottomRightRadius: scalePx(15),
    borderColor: color.accent.primary,
    borderLeftWidth: 0,
    borderTopRightRadius: scalePx(15),
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.large,
  },
  separator: {
    borderColor: color.accent.primary.color().alpha(0.5).toString(),
    borderRadius: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    bottom: -5,
    left: 0,
    position: 'absolute',
    right: -5,
    top: -5,
  },
  notch: {
    borderColor: color.accent.primary,
    borderRadius: (scalePx(7.5)),
    borderWidth: 1,
    height: scalePx(15),
    left: -(scalePx(7.5)),
    position: 'absolute',
    top: -(scalePx(7.5)),
    width: scalePx(15),
  },
  notchBottom: {
    bottom: -(scalePx(7.5)),
    top: null,
  },
  notchRight: {
    left: null,
    right: -(scalePx(7.5)),
  },
  lower: {
    padding: spacing.small,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  info: {
    backgroundColor: new DynamicValue(color.mono.pale.regular, color.monoDarkMode.pale.regular),
  },
  ticket: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
