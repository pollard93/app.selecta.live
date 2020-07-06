import { ApolloError } from 'apollo-client';
import { Linking } from 'react-native';
import moment from 'moment-timezone';
import { useCallback } from 'react';


/**
 * Gets Graphql error m
 * @param Err
 */
export const getGQLErrorMessage = (Err: ApolloError, fallback = 'Something went wrong') => {
  if (!Err.message.includes('GraphQL error:')) return fallback;
  return Err.message.replace('GraphQL error: ', '');
};


/**
 * Parse camel case into string with spaces
 */
export const parseCamelCase = (text: string) => text.replace(/([A-Z])/g, ' $1');


/**
 * Opens device settings
 */
export const openSettings = () => {
  const url = 'app-settings:';
  if (Linking.canOpenURL(url)) {
    Linking.openURL(url);
  }
};


/**
 * Format the given date for the users timezone
 *
 * @param {string} date
 * @param {format} string - A moment format or 'calendar'
 * @return {Moment}
 */
export const formatForTimezone = (date: string, format?: string): string => {
  const timezone = moment.tz.guess();
  const formattedDate = moment.tz(date, timezone);
  if (!formattedDate.isValid()) return null;
  return format === 'calendar'
    ? formattedDate.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY',
    })
    : formattedDate.format(format);
};


/**
 * Debounces a function and
 * @param fn - function to debounce
 * @param delay - delay of debounce
 */
const debounce = (fn, delay) => {
  let timeoutId;
  // eslint-disable-next-line func-names
  return function (...args) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};


/**
 * Wraps the above function in a useCallback to be used in a functional component
 * @param fn - function to debounce
 * @param delay - delay of debounce
 * @return function - the function to be executed on change etc
 */
export const useDebounce = (fn: Function, delay: number, watch = []) => useCallback(
  debounce((...value) => {
    fn(...value);
  }, delay),
  watch,
);
