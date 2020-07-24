import React, { useEffect, useRef } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import Toast from '../../components/UI/Toast/Toast';

const NetworkNotifier = (props) => {
  const netInfoState = useRef<NetInfoState>();

  /**
   * Subscribe to NetInfo
   * If changed from connected to not connected
   * Display toast using global.toast (top most screens toast handler)
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected && netInfoState.current.isConnected) {
        setTimeout(() => {
          global.toast.push({
            duration: 1000,
            component: (
              <Toast
                type="ERROR"
                content='You are not connected to the internet'
              />
            ),
            dismissible: false,
          });
        }, 1000);
      }

      netInfoState.current = state;
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  return props.children;
};


export default NetworkNotifier;
