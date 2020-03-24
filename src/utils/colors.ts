/* eslint-disable no-extend-native, func-names */
import Color from 'color';


/**
 * Adds color manipulation instance creation to the string prototype
 */
String.prototype.color = function () { return Color(this.toString()); };

declare global {
  interface String {
    color(): Color;
  }
}


export {};
