import React from 'react';
import AClient from '../ApolloClient';
import { getSelf } from '../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../API/query/getSelf/getSelf';
import { store } from './storage';
import { pushToast } from '../modules/Toast';
import Toast from '../components/UI/Toast/Toast';


/**
 * Utility to validate the user is logged in
 * Pushes toast and returns false if not
 */
export const isLoggedIn = () => {
  try {
    AClient.readQuery<getSelf>({
      query: GET_SELF_QUERY,
    });
    return true;
  } catch {
    pushToast({
      duration: 3000,
      component: (
        <Toast
          type="ERROR"
          content="Please login"
        />
      ),
      dismissible: false,
    });
    return false;
  }
};


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
