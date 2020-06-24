import { ApolloError } from 'apollo-client';
import { Linking } from 'react-native';
import moment from 'moment-timezone';


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
