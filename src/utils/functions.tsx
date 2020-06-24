import { ApolloError } from 'apollo-client';


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
