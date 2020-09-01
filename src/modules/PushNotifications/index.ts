import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import { NOTIFICATION_ON_OPEN_TYPE } from '../../../__generated__/globalTypes';
import { STACK } from '../../screens/utils/interfaces';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import { pushScreen } from '../../screens/utils';
import AClient from '../../ApolloClient';
import { LOGIN_CHANNEL_WITH_TOKEN_MUTATION } from '../../API/mutation/loginChannelWithToken/loginChannelWithToken';
import { loginChannelWithTokenVariables, loginChannelWithToken } from '../../API/mutation/loginChannelWithToken/__generated__/loginChannelWithToken';
import ChannelSelfScreen from '../../screens/ChannelSelfScreen/ChannelSelfScreen';
import { READ_NOTIFICATION_MUTATION } from '../../API/mutation/readNotification/readNotification';
import { readNotification, readNotificationVariables } from '../../API/mutation/readNotification/__generated__/readNotification';
import { GET_SELF_UNREAD_NOTIFICATION_COUNT_QUERY } from '../../API/query/getSelf/getSelf';
import { isLoggedIn } from '../../utils/userFunctions';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';


/**
 * Default data that will always be present on a push notification sent from api
 */
export interface PushNotificationData {
  notificationId: string;
  onOpenType: NOTIFICATION_ON_OPEN_TYPE;
  streamId?: string;
  channelId?: string;
}


class PushNotifications {
  /**
   * Init will user id, will bind the setExternalUserId in onesignal for targetting via api
   * Pass promptNow to prompt user for permissions
   */
  public static init(id: string, promptNow = false) {
    OneSignal.init(Config.REACT_APP_ONESIGNAL_APPID, { kOSSettingsKeyAutoPrompt: promptNow });
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', PushNotifications.onReceived);
    OneSignal.addEventListener('opened', PushNotifications.onOpened);
    OneSignal.setExternalUserId(id);

    /**
     * Wait until the user is subscribed and setExternalId
     */
    const setExternalId = (data) => {
      if (data.subscribed) {
        OneSignal.setExternalUserId(id);
        OneSignal.removeEventListener('ids', setExternalId);
      }
    };
    OneSignal.addEventListener('ids', setExternalId);
  }

  public static disconnect() {
    OneSignal.removeEventListener('received', PushNotifications.onReceived);
    OneSignal.removeEventListener('opened', PushNotifications.onOpened);
    OneSignal.removeExternalUserId();
  }

  public static onReceived() {
    /**
     * On Received query getSelf to update unreadNotificationCount
     */
    AClient.query({
      query: GET_SELF_UNREAD_NOTIFICATION_COUNT_QUERY,
      fetchPolicy: 'network-only',
    });
  }

  public static async onOpened(openResult) {
    try {
      /**
       * Get data from notification
       */
      const data: PushNotificationData = openResult.notification.payload.additionalData;


      /**
       * Dismiss all modals and set tab to STACK.TAB_HOME
       */
      Navigation.dismissAllModals();
      Navigation.popToRoot(STACK.TAB_HOME);
      Navigation.mergeOptions(STACK.ROOT, {
        bottomTabs: {
          currentTabIndex: 0,
        },
      });


      /**
        * Open notification
        */
      switch (data.onOpenType) {
        case NOTIFICATION_ON_OPEN_TYPE.STREAM:
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
          await pushScreen(STACK.TAB_HOME, StreamProfileScreen, {
            id: data.streamId,
          });
          break;

        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL:
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
          await pushScreen(STACK.TAB_HOME, ChannelProfileScreen, {
            id: data.channelId,
          });
          break;

        case NOTIFICATION_ON_OPEN_TYPE.CHANNEL_LOGIN:
          if (!isLoggedIn()) break;

          /**
           * Try and login to channel and push ChannelSelfScreen if successful
           */
          try {
            await AClient.mutate<loginChannelWithToken, loginChannelWithTokenVariables>({
              mutation: LOGIN_CHANNEL_WITH_TOKEN_MUTATION,
              variables: {
                id: data.channelId,
              },
            });


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
            await pushScreen(STACK.TAB_HOME, ChannelSelfScreen, {
              id: data.channelId,
            });
          // eslint-disable-next-line no-empty
          } catch {}
          break;

        default:
          break;
      }


      /**
       * Set notification to read
       */
      try {
        await AClient.mutate<readNotification, readNotificationVariables>({
          mutation: READ_NOTIFICATION_MUTATION,
          variables: {
            id: data.notificationId,
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}
    // eslint-disable-next-line no-empty
    } catch {}
  }
}

export default PushNotifications;
