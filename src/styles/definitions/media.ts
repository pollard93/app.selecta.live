import { ViewportRule } from '../../utils/responsiveProperties';

/**
 * Common ViewportRule compatible media query rules
 */
const mediaQueries: {[key: string]: ViewportRule} = {
  // 2x pixel ratio and up
  small2: {
    pixelRatio: { min: 2 },
    deviceWidth: { max: 360 },
  },

  medium2: {
    pixelRatio: { min: 2 },
    deviceWidth: { max: 666 },
  },

  large2: {
    pixelRatio: { min: 2 },
    deviceWidth: { max: 735 },
  },

  tablets2: {
    pixelRatio: { min: 2 },
    deviceWidth: { min: 736 },
  },

  // 3x pixel ratio and up
  small3: {
    pixelRatio: { min: 3 },
    deviceWidth: { max: 360 },
  },

  medium3: {
    pixelRatio: { min: 3 },
    deviceWidth: { max: 666 },
  },

  large3: {
    pixelRatio: { min: 3 },
    deviceWidth: { max: 735 },
  },

  tablets3: {
    pixelRatio: { min: 3 },
    deviceWidth: { min: 736 },
  },

  // 3.5x pixel ratio and up
  small35: {
    pixelRatio: { min: 3.5 },
    deviceWidth: { max: 360 },
  },

  medium35: {
    pixelRatio: { min: 3.5 },
    deviceWidth: { max: 666 },
  },

  large35: {
    pixelRatio: { min: 3.5 },
    deviceWidth: { max: 735 },
  },

  tablets35: {
    pixelRatio: { min: 3.5 },
    deviceWidth: { min: 736 },
  },
};

export default mediaQueries;
