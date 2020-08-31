import React from 'react';
import Config from 'react-native-config';
import client from '../../ApolloClient';
import { VERIFY_USER_QUERY } from '../../API/query/verifyUser/verifyUser';
import { VERIFY_EMAIL_CHANGE_QUERY } from '../../API/query/verifyEmailChange/verifyEmailChange';
import Toast from '../../components/UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import { pushToast } from '../Toast';

export type DeepLinkUri = 'verify/' | 'verify-email/';

export const onOpenLink = async ({ url }: { url: string }) => {
  try {
    const uri = url.replace(Config.REACT_APP_DEEP_LINKING_BASE_URL.toLowerCase(), '');

    if (uri.startsWith('verify/')) {
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
    } else if (uri.startsWith('verify-email/')) {
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
    }
  } catch {
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
