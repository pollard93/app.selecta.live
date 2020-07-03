import fontFamily from '../../utils/fontFamily';
import scalePx from '../../utils/scalePx';

/**
 * Font style definitions
 */
export default {

  // Font families
  family: {
    body: fontFamily({
      name: 'Inter',
      weights: {
        regular: {
          postScriptName: 'Inter-Regular',
          weight: '400',
        },
        semibold: {
          postScriptName: 'Inter-SemiBold',
          weight: '600',
        },
        bold: {
          postScriptName: 'Inter-Bold',
          weight: '700',
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
    body: scalePx(14),
    small: scalePx(11),
  },

};
