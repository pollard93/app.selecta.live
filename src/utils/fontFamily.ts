import { Platform } from 'react-native';

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

interface FontFamily {
  name: string; // Family name
  weights: {
    [key: string]: {
      postScriptName: string; // PostScript name
      weight: FontWeight;
    };
  };
}


/**
 * Returns a function to get platform specific font weight data from a FontFamily object
 *
 * @example
 *   const example = fontFamily({
 *     name: 'Example',
 *     weights: {
 *       regular: {
 *         postScriptName: 'Example-Regular',
 *         weight: '400',
 *       },
 *     }
 *   });
 *   const fontWeightData = example('regular');
 *
 * @param {FontFamily} familyData FontFamily object
 * @param {string} weight FontFamily weights key
 * @return {function} (fontFamilyWeightKey) => { font weight data }
 */
export default (familyData: FontFamily) => (weight: string) => {
  if (!Object.prototype.hasOwnProperty.call(familyData.weights, weight)) throw new Error(`Invalid font weight "${weight}" on "${familyData.name}"`);

  if (Platform.OS === 'android') {
    // Android
    return {
      fontFamily: familyData.weights[weight].postScriptName,
    };
  }

  // iOS
  return {
    fontFamily: familyData.name,
    fontWeight: familyData.weights[weight].weight,
  };
};
