import AClient from '../ApolloClient';
import { getSelf } from '../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../API/query/getSelf/getSelf';
import { store } from './storage';


/**
 * Gets the most up to date cache of getSelf and stores in async storage
 * This should be used at any point the cached getSelf is updated
 */
export const updateStoredGetSelf = async () => {
  try {
    const data = AClient.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });

    await store('getSelf', data.getSelf);
  // eslint-disable-next-line no-empty
  } catch {}
};
