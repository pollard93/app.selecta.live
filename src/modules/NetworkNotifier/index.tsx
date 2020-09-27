import React from 'react';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import Toast from '../../components/UI/Toast/Toast';
import { pushToast } from '../Toast';


declare global {
  namespace NodeJS {
    interface Global {
      networkNotifier: {
        unsubscribe: NetInfoSubscription;
        lastState: NetInfoState;
      };
    }
  }
}

export default () => {
  /**
   * Try and unsubscribe
   */
  // eslint-disable-next-line no-unused-expressions
  global.networkNotifier?.unsubscribe?.();


  /**
   * Subscribe
   */
  global.networkNotifier = {
    unsubscribe: NetInfo.addEventListener((state) => {
      if (!state.isConnected && global.networkNotifier.lastState.isConnected) {
        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="ERROR"
              content='You are not connected to the internet'
            />
          ),
          dismissible: false,
        });
      }

      global.networkNotifier.lastState = state;
    }),
    lastState: null,
  };
};
