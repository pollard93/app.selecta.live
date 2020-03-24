import responsiveProperties from './responsiveProperties';
import media from '../styles/definitions/media';
import { globalPixelScalingModifier } from '../styles/definitions/core';


/**
 * Responsive viewport scaling modifier
 */
const viewportPixelScalingModifier = responsiveProperties([
  // Default
  { rule: {},
    property: 1 },

  // 2x
  { rule: media.small2,
    property: 0.95 },

  { rule: media.medium2,
    property: 1 },

  { rule: media.large2,
    property: 1.15 },

  { rule: media.tablets2,
    property: 1.25 },

  // 3x
  { rule: media.small3,
    property: 1 },

  { rule: media.medium3,
    property: 1.15 },

  { rule: media.large3,
    property: 1.2 },

  { rule: media.tablets3,
    property: 1.27 },

  // 3.5x
  { rule: media.small35,
    property: 1 },

  { rule: media.medium35,
    property: 1.2 },

  { rule: media.large35,
    property: 1.25 },

  { rule: media.tablets35,
    property: 1.4 },
]).last;


/**
 * Automatically scale pixel units with viewport modifier & global scaling definitions
 *
 * @see globalPixelScalingModifier
 */
export default (px: number): number => px * viewportPixelScalingModifier * globalPixelScalingModifier;
