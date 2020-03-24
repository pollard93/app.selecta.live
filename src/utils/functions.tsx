export const getGQLErrorMessage = (Err) => {
  if (!Err.message.includes('GraphQL error:')) return null;
  return Err.message.replace('GraphQL error: ', '');
};
