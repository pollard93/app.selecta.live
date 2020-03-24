import { store } from '../../../../utils/storage';
import { LocalResolver } from '../../types';
import { LOCAL_AUTH_KEY } from '../putAccessToken/putAccessToken';
import PushNotifications from '../../../../modules/PushNotifications';

/**
 * Resets cache, thus removing the access token
 * Removes it from async storage
 * Unbinds notifications
 */
const removeAccessToken: LocalResolver<null, boolean> = async (_, args, { cache }) => {
  // Reset cache
  cache.reset();

  // Remove token from async storage
  await store(LOCAL_AUTH_KEY, null);

  // Remove notifications
  PushNotifications.remove();

  return true;
};

export default removeAccessToken;
