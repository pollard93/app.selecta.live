import React, { ReactNode, useEffect, useRef } from 'react';
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
  const lastScreenRef = useRef<ToastContextProps>();

  useEffect(() => {
    const screenDidAppearEventListener = Navigation.events().registerComponentDidAppearListener((args) => {
    console.log("screenDidAppearEventListener -> args", args)
      // if (screenName === componentName) {
      //   global.toast = toast as ToastContextProps;
      // }
    });
    return () => screenDidAppearEventListener.remove();
  }, []);

  useEffect(() => {
    const screenDidDisappearEventListener = Navigation.events().registerComponentDidDisappearListener((args) => {
    console.log("screenDidDisappearEventListener", args)
    // console.log("componentName", componentName)

    global.toast = lastScreenRef.current;
    lastScreenRef.current = args.componentName;

    //   global.toast = lastScreenRef.current;

      // if (screenName === componentName) {
      //   global.toast = toast as ToastContextProps;
      //   lastScreenRef.current = global.toast;
      // }
    });
    return () => screenDidDisappearEventListener.remove();
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
