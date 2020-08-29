import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import { NOTIFICATION_TYPE } from '../../../__generated__/globalTypes';
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


/**
 * Default data that will always be present on a push notification sent from api
 * This data should be taken and updated from api
 */
export interface PushNotificationData<T extends NOTIFICATION_TYPE>{
  type: T;
  notificationId: string;
}


/**
 * Define required data that will be attached to a push notification
 * If no NOTIFICATION_TYPE given, defaults to PushNotificationData
 * This data should be taken and updated from api
 */
type PushNotificationDataType<T extends NOTIFICATION_TYPE> =
  T extends NOTIFICATION_TYPE.STREAM_CANCELLED ? {streamId: string} & PushNotificationData<T> :
  T extends NOTIFICATION_TYPE.NEW_STREAM_FROM_FOLLOWING ? {streamId: string, channelId: string} & PushNotificationData<T> :
  T extends NOTIFICATION_TYPE.REQUESTED_CHANNEL_APPROVED ? {channelId: string} & PushNotificationData<T> :
  PushNotificationData<T>;


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
      const data: PushNotificationDataType<any> = openResult.notification.payload.additionalData;


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
      switch (data.type) {
        case NOTIFICATION_TYPE.STREAM_CANCELLED:
        case NOTIFICATION_TYPE.NEW_STREAM_FROM_FOLLOWING:
          /**
           * Push StreamProfileScreen
           */
          await pushScreen(STACK.TAB_HOME, StreamProfileScreen, {
            id: (data as PushNotificationDataType<NOTIFICATION_TYPE.STREAM_CANCELLED | NOTIFICATION_TYPE.NEW_STREAM_FROM_FOLLOWING>).streamId,
          });
          break;

        case NOTIFICATION_TYPE.REQUESTED_CHANNEL_APPROVED:
          /**
           * Try and login to channel and push ChannelSelfScreen if successful
           */
          try {
            await AClient.mutate<loginChannelWithToken, loginChannelWithTokenVariables>({
              mutation: LOGIN_CHANNEL_WITH_TOKEN_MUTATION,
              variables: {
                id: (data as PushNotificationDataType<NOTIFICATION_TYPE.REQUESTED_CHANNEL_APPROVED>).channelId,
              },
            });

            await pushScreen(STACK.TAB_HOME, ChannelSelfScreen, {
              id: (data as PushNotificationDataType<NOTIFICATION_TYPE.REQUESTED_CHANNEL_APPROVED>).channelId,
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
