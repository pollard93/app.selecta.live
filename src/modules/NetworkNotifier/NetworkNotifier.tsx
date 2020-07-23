import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from '../../components/UI/Toast/Toast';

const NetworkNotifier = (props) => {
  /**
   * Subscribe to NetInfo
   * If not connected
   * Display toast using global.toast (top most screens toast handler)
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
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
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  return props.children;
};


export default NetworkNotifier;
