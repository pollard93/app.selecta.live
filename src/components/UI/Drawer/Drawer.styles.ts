import { StyleSheet } from 'react-native';
import color from '../../../styles/definitions/color';

export default StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.mono.light,
    borderColor: color.mono.pale.regular,
    borderTopWidth: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
