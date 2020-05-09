import { LocalResolver } from '../../types';
import { store } from '../../../../utils/storage';
import { LOCAL_CHANNEL_AUTH_KEY } from '../../mutation/putChannelAccessToken/putChannelAccessToken';

/**
 * Gets access token from async storage
 * This will only be run once to initialise the cache
 */
const getChannelAccessToken: LocalResolver<null, string> = async () => store(LOCAL_CHANNEL_AUTH_KEY);

export default getChannelAccessToken;
