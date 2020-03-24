import { LocalResolver } from '../../types';
import { store } from '../../../../utils/storage';
import { LOCAL_AUTH_KEY } from '../../mutation/putAccessToken/putAccessToken';

/**
 * Gets access token from async storage
 * This will only be run once to initialise the cache
 */
const getAccessToken: LocalResolver<null, string> = async () => store(LOCAL_AUTH_KEY);

export default getAccessToken;
