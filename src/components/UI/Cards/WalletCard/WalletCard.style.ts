import { StyleSheet } from 'react-native';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dynamic';
import spacing from '../../../../styles/definitions/spacing';
import color from '../../../../styles/definitions/color';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';

export default StyleSheet.create({
  wrap: {
    borderRadius: spacing.base,
    justifyContent: 'space-between',
    padding: spacing.base,
    ...GlobalStyles.AspectRatio,
  },
  backgroundImageWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    maxWidth: '20%',
    opacity: 0.2,
  },
  bottom: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    opacity: 0.5,
  },
});

export const DynamicStyles = new DynamicStyleSheet({
  wrap: {
    backgroundColor: new DynamicValue(color.mono.light, color.mono.dark),
  },
});
