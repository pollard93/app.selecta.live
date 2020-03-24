import { store } from '../../../../utils/storage';
import { LocalResolver } from '../../types';
import { GET_ACCESS_TOKEN_QUERY } from '../../query/getAccessToken/getAccessTokenQuery';
import { putAccessTokenVariables } from './__generated__/putAccessToken';
import { getAccessToken } from '../../query/getAccessToken/__generated__/getAccessToken';

export const LOCAL_AUTH_KEY = 'LOCAL_AUTH_KEY';

/**
 * Writes getAccessToken query to store the token in cache
 * Stores token in async storage
 */
const putAccessToken: LocalResolver<putAccessTokenVariables, any> = async (_, { token }, { cache }) => {
  // Store token in cache
  cache.writeQuery<getAccessToken>({
    query: GET_ACCESS_TOKEN_QUERY,
    data: {
      getAccessToken: token,
    },
  });

  // Store token in async storage
  await store(LOCAL_AUTH_KEY, token);

  return true;
};

export default putAccessToken;
