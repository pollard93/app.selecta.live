/* eslint-disable no-console */
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import Config from 'react-native-config';

class PushNotifications {
  /**
   * Init will user id, will bind the setExternalUserId in onesignal for targetting via api
   */
  public static init(id: string) {
    OneSignal.init(Config.REACT_APP_ONESIGNAL_APPID, { kOSSettingsKeyAutoPrompt: false });
    OneSignal.addEventListener('received', PushNotifications.onReceived);
    OneSignal.addEventListener('opened', PushNotifications.onOpened);
    OneSignal.setExternalUserId(id);

    // If the user has not previously accepting notifications, setExternalUserId above will have failed
    // If and when the user does accept it, subscribe to the onIds event and try and setExternalId
    const setExternalId = () => {
      setTimeout(() => {
        OneSignal.setExternalUserId(id);
        OneSignal.removeEventListener('ids', setExternalId);
      }, 10000);
    };
    OneSignal.addEventListener('ids', setExternalId);
  }

  public static disconnect() {
    OneSignal.removeEventListener('received', PushNotifications.onReceived);
    OneSignal.removeEventListener('opened', PushNotifications.onOpened);
    OneSignal.removeExternalUserId();
  }

  public static onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  public static onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  // public static onIds(device) {
  //   console.log('Device info: ', device);
  // }
}

export default PushNotifications;
