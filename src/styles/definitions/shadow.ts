import '../../utils/colors';
import color from './color';

export default {

  regular: {
    shadowColor: color.mono.dark.color().alpha(0.5).string(),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

};
