import { PixelRatio, Dimensions } from 'react-native';


type ViewportOrientation = 'landscape' | 'portrait';
type ViewportDimensionConstraint = {
  min?: number;
  max?: number;
  equals?: number;
};

export interface ViewportRule {
  orientation?: ViewportOrientation;
  pixelRatio?: ViewportDimensionConstraint;
  deviceWidth?: ViewportDimensionConstraint;
  deviceHeight?: ViewportDimensionConstraint;
}

interface ResponsiveProperty<T> {
  rule: ViewportRule;
  property: T;
}


/**
 * Viewport variables
 */
const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const orientation: ViewportOrientation = deviceWidth >= deviceHeight ? 'landscape' : 'portrait';


/**
 * Checks a comparison value against a viewport constraint object
 *
 * @param {ViewportDimensionConstraint} constraint Min/max/equals constraint
 * @param {number} comparator Comparison value
 * @returns {boolean}
 */
const matchViewportDimensionConstraint = (constraint: ViewportDimensionConstraint, comparator: number): boolean => {
  if (constraint) {
    if (Object.prototype.hasOwnProperty.call(constraint, 'equals') && comparator !== constraint.equals) return false;
    if (Object.prototype.hasOwnProperty.call(constraint, 'min') && comparator < constraint.min) return false;
    if (Object.prototype.hasOwnProperty.call(constraint, 'max') && comparator > constraint.max) return false;
  }
  return true;
};


/**
 * Checks a viewport rule object against the current viewport variables
 *
 * @param {ViewportRule} rule Viewport rule
 * @returns {boolean}
 */
const matchViewportRule = (rule: ViewportRule):boolean => {
  // Orientation validation
  if (rule.orientation && rule.orientation !== orientation) return false;

  // Pixel ratio validation
  if (!matchViewportDimensionConstraint(rule.pixelRatio, pixelRatio)) return false;

  // Device width validation
  if (!matchViewportDimensionConstraint(rule.deviceWidth, deviceWidth)) return false;

  // Device width validation
  if (!matchViewportDimensionConstraint(rule.deviceWidth, deviceWidth)) return false;

  // Default
  return true;
};


/**
 * Returns a single property that matches viewport rules
 *
 * @template T
 * @param {ResponsiveProperty<T>} property
 * @returns {T}
 */
export const responsiveProperty = <T>(property: ResponsiveProperty<T>): T => (matchViewportRule(property.rule) ? property.property : null);


/**
 * Returns an array of properties that matches viewport rules along with first and last single matches
 *
 * @template T
 * @param {ResponsiveProperty<T>[]} properties
 * @returns {{ all: T[], first: T, last: T }}
 */
export const responsiveProperties = <T>(properties: ResponsiveProperty<T>[]): { all: T[], first?: T, last?: T } => {
  const matchingProperties = properties
    .filter((propertyGroup) => matchViewportRule(propertyGroup.rule)) // Filter non-matching viewport rules
    .map((propertyGroup) => propertyGroup.property); // Return properties only

  return {
    all: matchingProperties,
    first: matchingProperties.length ? matchingProperties[0] : null,
    last: matchingProperties.length ? matchingProperties[matchingProperties.length - 1] : null,
  };
};

export default responsiveProperties;
