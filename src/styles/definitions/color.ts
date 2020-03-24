import '../../utils/colors';

/**
 * Color style definitions
 *
 * If the string is a valid color code, a `.color()` prototype is available that
 * returns a new Color instance.
 *
 * @example '#fff'.color().alpha(0.5).string() // rgba(255, 255, 255, 0.5)
 *
 * For more information on color transformations and utilities:
 * @see https://www.npmjs.com/package/color#usage
 */
export default {

  // Monochromatic color group
  mono: {
    light: '#fff',
    dark: '#000',
  },


  // Accented color group
  accent: {
    primary: '#147efb',
  },

};
