import { LocalResolver } from '../../types';
import PushNotifications from '../../../../modules/PushNotifications';
import { store } from '../../../../utils/storage';
import { LOCAL_CHANNEL_AUTH_KEY } from '../putChannelAccessToken/putChannelAccessToken';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../query/getChannelAccessToken/getChannelAccessTokenQuery';
import { getChannelAccessToken } from '../../query/getChannelAccessToken/__generated__/getChannelAccessToken';

/**
 * Resets cache, thus removing the access token
 * Removes it from async storage
 * Unbinds notifications
 */
const removeChannelAccessToken: LocalResolver<null, boolean> = async (_, args, { cache }) => {
  // Reset cache
  cache.writeQuery<getChannelAccessToken>({
    query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
    data: {
      getChannelAccessToken: null,
    },
  });

  // Remove token from async storage
  await store(LOCAL_CHANNEL_AUTH_KEY, null);

  // Disconnect notifications
  PushNotifications.disconnect();

  return true;
};

export default removeChannelAccessToken;
