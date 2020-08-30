import React, { ReactNode, useEffect } from 'react';
import { ToastProvider as ToastProviderModule, useToast, ToastContextProps } from 'mbp-components-rn-toast';
import { Navigation } from 'react-native-navigation';


declare global {
  namespace NodeJS {
    interface Global {
      toast: ToastContextProps;
    }
  }
}


/**
 * Listens for screenDidAppear and assigned the screens toast context to global.toast
 * This is useful for functionality in outer scope to be able to target the toast that is currently visible
 */
const ToastInner = ({ screenName }) => {
  const toast = useToast();

  useEffect(() => {
    const screenDidAppearEventListener = Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
      if (screenName === componentName) {
        global.toast = toast as ToastContextProps;
      }
    });
    return () => screenDidAppearEventListener.remove();
  }, []);

  return null;
};


interface ToastProviderProps {
  screenName: string;
  children?: ReactNode;
}

const ToastProvider = (props: ToastProviderProps) => (
  <ToastProviderModule position='top'>
    <ToastInner screenName={props.screenName} />
    {props.children}
  </ToastProviderModule>
);


export default ToastProvider;
