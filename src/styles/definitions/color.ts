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
    lightCover: 'rgba(255, 255, 255, 0.1)',
    dark: '#191918',
    darkCover: 'rgba(0, 0, 0, 0.8)',
    pale: {
      light: '#f0f0f0',
      regular: '#d8d8d8',
      dark: '#8e8e8e',
    },
  },

  monoDarkMode: {
    pale: {
      light: '#2b2b2b',
      regular: '#303030',
      dark: '#393939',
    },
  },


  // Accented color group
  accent: {
    primary: '#E40436',
    secondary: '#000000',
  },


  gradient: {
    primary: ['#DD247C', '#E40436'],
  },


  // State color group
  state: {
    success: '#DD247C',
    error: '#E40436',
  },

  // Specific brand colors
  brands: {
    facebook: '#3b5998',
    google: '#d8d8d8',
  },

};
