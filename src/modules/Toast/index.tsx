import { Navigation } from 'react-native-navigation';
import { ToastOverlayName, ToastOverlayProps } from '../../screens/ToastOverlay/ToastOverlay';


/**
 * Show toast overlay
 */
export const pushToast = (passProps: ToastOverlayProps) => Navigation.showOverlay({
  component: {
    name: ToastOverlayName,
    passProps,
  },
});
