import fontFamily from '../../utils/fontFamily';
import scalePx from '../../utils/scalePx';

/**
 * Font style definitions
 */
export default {

  // Font families
  family: {
    body: fontFamily({
      name: 'Open Sans',
      weights: {
        light: {
          postScriptName: 'OpenSans-CondLight',
          weight: '300',
        },
      },
    }),
    heading: fontFamily({
      name: 'Open Sans Condensed',
      weights: {
        bold: {
          postScriptName: 'OpenSans-CondBold',
          weight: 'bold',
        },
      },
    }),
  },


  // Font sizes
  size: {
    h1: scalePx(40),
    h2: scalePx(30),
    h3: scalePx(24),
    h4: scalePx(18),
    body: scalePx(16),
    small: scalePx(11),
  },

};
