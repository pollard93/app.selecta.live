import { ApolloError } from 'apollo-client';

export const getGQLErrorMessage = (Err: ApolloError, fallback?: string) => {
  /**
   * If not a graphql message then use the fallback message
   */
  if (!Err.message.includes('GraphQL error:')) {
    return fallback || 'Something Went wrong';
  }

  // Return the error
  return Err.message.replace('GraphQL error: ', '');
};
