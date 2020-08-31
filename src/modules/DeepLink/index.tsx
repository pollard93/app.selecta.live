import React from 'react';
import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import client from '../../ApolloClient';
import { VERIFY_USER_QUERY } from '../../API/query/verifyUser/verifyUser';
import { VERIFY_EMAIL_CHANGE_QUERY } from '../../API/query/verifyEmailChange/verifyEmailChange';
import Toast from '../../components/UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import { pushToast } from '../Toast';
import { pushScreen } from '../../screens/utils';
import { STACK } from '../../screens/utils/interfaces';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';


/**
 * Handles Deep linking urls
 */
export const onOpenLink = async ({ url }: { url: string }) => {
  try {
    const uri = url.replace(Config.REACT_APP_DEEP_LINKING_BASE_URL.toLowerCase(), '');

    switch (true) {
      /**
       * Verify
       */
      case uri.startsWith('verify/'):
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
        try {
          await client.query({
            query: VERIFY_EMAIL_CHANGE_QUERY,
            context: {
              headers: {
                authorization: uri.replace('verify-email/', ''),
              },
            },
          });

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
