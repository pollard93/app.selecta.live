/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
import SafeArea, { SafeAreaInsets } from 'react-native-safe-area';

declare global {
  namespace NodeJS {
    interface Global {
      safeAreaInsets: SafeAreaInsets;
    }
  }
}


/**
 * Utility to get and set safe area insets as a global variable
 */
export const setSafeArea = async () => {
  try {
    const { safeAreaInsets } = await SafeArea.getSafeAreaInsetsForRootView();
    global.safeAreaInsets = safeAreaInsets;
  } catch {
    global.safeAreaInsets = { top: 0, left: 0, bottom: 0, right: 0 };
  }
};


/**
 * Access to the global variable
 */
const useSafeArea = () => global.safeAreaInsets;


export default useSafeArea;
