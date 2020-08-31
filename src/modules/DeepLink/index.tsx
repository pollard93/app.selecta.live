import React from 'react';
import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import jwtDecode from 'jwt-decode';
import client from '../../ApolloClient';
import { VERIFY_USER_QUERY } from '../../API/query/verifyUser/verifyUser';
import { VERIFY_EMAIL_CHANGE_QUERY } from '../../API/query/verifyEmailChange/verifyEmailChange';
import Toast from '../../components/UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import { pushToast } from '../Toast';
import { pushScreen, openScreenAsModal } from '../../screens/utils';
import { STACK } from '../../screens/utils/interfaces';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';
import { getSelf } from '../../API/query/getSelf/__generated__/getSelf';
import { GET_SELF_QUERY } from '../../API/query/getSelf/getSelf';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen/ResetPasswordScreen';
import { updateStoredGetSelf } from '../../utils/userFunctions';


/**
 * Utility to validate the user is logged in
 * Pushes toast and returns false if not
 */
const isLoggedIn = () => {
  try {
    client.readQuery<getSelf>({
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
 * Utility to validate the expiry of a token in a deep link
 * Pushes toast and returns false if expired
 */
const validateToken = (token: string) => {
  const { exp } = jwtDecode(token);
  if (new Date(exp * 1000) <= new Date(Date.now() - 30000)) {
    pushToast({
      duration: 1000,
      component: (
        <Toast
          type="ERROR"
          content="Link has expired"
        />
      ),
      dismissible: false,
    });
    return false;
  }
  return true;
};


/**
 * Handles Deep linking urls
 */
export const onOpenLink = async ({ url }: { url: string }) => {
  try {
    const uri = url.replace(Config.REACT_APP_DEEP_LINKING_BASE_URL.toLowerCase(), '');


    switch (true) {
      /**
       * Reset Password
       */
      case uri.startsWith('reset-password/'):
        const token = uri.replace('reset-password/', '');
        if (!validateToken(token)) break;
        openScreenAsModal(STACK.RESET_PASSWORD, ResetPasswordScreen, { token });
        break;


      /**
       * Verify
       */
      case uri.startsWith('verify/'):
        if (!isLoggedIn()) break;

        try {
          await client.query({
            query: VERIFY_USER_QUERY,
            context: {
              headers: {
                authorization: uri.replace('verify/', ''),
              },
            },
          });

          pushToast({
            duration: 3000,
            component: (
              <Toast
                type="SUCCESS"
                content="You are now verified"
              />
            ),
            dismissible: false,
          });
        } catch (e) {
          pushToast({
            duration: 3000,
            component: (
              <Toast
                type="ERROR"
                content={getGQLErrorMessage(e)}
              />
            ),
            dismissible: false,
          });
        }
        break;


      /**
       * Verify email
       */
      case uri.startsWith('verify-email/'):
        if (!isLoggedIn()) break;

        try {
          await client.query({
            query: VERIFY_EMAIL_CHANGE_QUERY,
            context: {
              headers: {
                authorization: uri.replace('verify-email/', ''),
              },
            },
          });

          updateStoredGetSelf();

          pushToast({
            duration: 3000,
            component: (
              <Toast
                type="SUCCESS"
                content="Email Updated"
              />
            ),
            dismissible: false,
          });
        } catch (e) {
          pushToast({
            duration: 3000,
            component: (
              <Toast
                type="ERROR"
                content={getGQLErrorMessage(e)}
              />
            ),
            dismissible: false,
          });
        }
        break;


      /**
       * Stream view
       */
      case uri.startsWith('stream/'):
        if (!isLoggedIn()) break;

        /**
         * Clear TAB_HOME stack, modals and switch to TAB_HOME tab
         */
        Navigation.popToRoot(STACK.TAB_HOME);
        Navigation.dismissAllModals();
        Navigation.mergeOptions(STACK.ROOT, {
          bottomTabs: {
            currentTabIndex: 0,
          },
        });
        pushScreen(STACK.TAB_HOME, StreamProfileScreen, { id: url.split('/').pop() });
        break;


      /**
       * Channel view
       */
      case uri.startsWith('channel/'):
        if (!isLoggedIn()) break;

        /**
         * Clear TAB_HOME stack, modals and switch to TAB_HOME tab
         */
        Navigation.popToRoot(STACK.TAB_HOME);
        Navigation.dismissAllModals();
        Navigation.mergeOptions(STACK.ROOT, {
          bottomTabs: {
            currentTabIndex: 0,
          },
        });
        pushScreen(STACK.TAB_HOME, ChannelProfileScreen, { id: url.split('/').pop() });
        break;


      /**
       * Default - error
       */
      default:
        pushToast({
          duration: 3000,
          component: (
            <Toast
              type="ERROR"
              content='Cannot open link'
            />
          ),
          dismissible: false,
        });
        break;
    }
  } catch {
    /**
     * Catch all errors
     */
    pushToast({
      duration: 3000,
      component: (
        <Toast
          type="ERROR"
          content='Cannot open link'
        />
      ),
      dismissible: false,
    });
  }
};
