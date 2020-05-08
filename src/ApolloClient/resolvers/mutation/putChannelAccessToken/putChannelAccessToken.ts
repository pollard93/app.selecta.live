import { LocalResolver } from '../../types';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../query/getChannelAccessToken/getChannelAccessTokenQuery';
import { putChannelAccessTokenVariables } from './__generated__/putChannelAccessToken';
import { getChannelAccessToken } from '../../query/getChannelAccessToken/__generated__/getChannelAccessToken';
import { store } from '../../../../utils/storage';

export const LOCAL_CHANNEL_AUTH_KEY = 'LOCAL_CHANNEL_AUTH_KEY';

/**
 * Writes getChannelAccessToken query to store the token in cache
 */
const putChannelAccessToken: LocalResolver<putChannelAccessTokenVariables, any> = async (_, { token }, { cache }) => {
  // Store token in cache
  cache.writeQuery<getChannelAccessToken>({
    query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
    data: {
      getChannelAccessToken: token,
    },
  });

  // Store token in async storage
  await store(LOCAL_CHANNEL_AUTH_KEY, token);


  return true;
};

export default putChannelAccessToken;
