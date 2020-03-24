import { StyleProp, TextStyle } from 'react-native';
import font from './font';

/**
 * Predefined typography property groups
 */
export default {

  // Body
  body: {
    ...font.family.body('regular'),
    fontSize: font.size.body,
  },


  // Headings
  h1: {
    ...font.family.body('bold'),
    fontSize: font.size.h1,
  },

  h2: {
    ...font.family.body('bold'),
    fontSize: font.size.h2,
  },

  h3: {
    ...font.family.body('bold'),
    fontSize: font.size.h3,
  },

  h4: {
    ...font.family.body('bold'),
    fontSize: font.size.h4,
  },

} as {[key: string]: StyleProp<TextStyle>};
