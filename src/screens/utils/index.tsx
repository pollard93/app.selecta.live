import { Navigation, OptionsModalPresentationStyle, OptionsModalTransitionStyle, Options } from 'react-native-navigation';
import React, { useState, useEffect, FC } from 'react';
import { LoginScreenName } from '../LoginScreen/LoginScreen';
import { LoginProps } from '../../components/Login/Login';
import { RequireUpdateScreenName } from '../RequireUpdateScreen/RequireUpdateScreen';
import { STACK } from './interfaces';
import { ModalScreenName, ModalScreenProps } from '../ModalScreen/ModalScreen';
import { ChannelSelfScreenName } from '../ChannelSelfScreen/ChannelSelfScreen';
import { OnboardingWelcomeScreenName } from '../OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';
import { HomeFeedScreenName } from '../HomeFeedScreen/HomeFeedScreen';
import color from '../../styles/definitions/color';
import Products from '../../components/Purchase/Products/Products';
import { WalletScreenName } from '../WalletScreen/WalletScreen';
import { ConsumingStreamProfilesScreenName } from '../ConsumingStreamProfilesScreen/ConsumingStreamProfilesScreen';


/**
 * Resets navigation stack to login screen using STACK.ONBOARDING
 * @param toastMessage - optional toast message to show on mount of login
 */
export const goToLogin = (passProps: LoginProps = {}) => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.ONBOARDING,
      children: [
        {
          component: {
            name: LoginScreenName,
            passProps,
          },
        },
      ],
    },
  },
});


/**
 * Resets navigation stack to require update screen using STACK.REQUIRE_UDPATE
 */
export const goToOnboarding = () => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.ONBOARDING,
      children: [
        {
          component: {
            name: OnboardingWelcomeScreenName,
          },
        },
      ],
    },
  },
});

interface GoHomeProps {
  currentTabIndex?: number; // Default 0
  passProps?: any; // Pass props
}

/**
 * Resets navigation stack to home screen using STACK.ROOT
 */
export const goHome = (props?: GoHomeProps) => {
  const currentTabIndex = props?.currentTabIndex || 0;

  return Navigation.setRoot({
    root: {
      bottomTabs: {
        id: STACK.ROOT,
        children: [
          {
            stack: {
              id: STACK.TAB_HOME,
              children: [
                {
                  component: {
                    name: HomeFeedScreenName,
                    passProps: currentTabIndex === 0 && props?.passProps,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/images/icons/tabs/feed.png'),
                  selectedIcon: require('../../assets/images/icons/tabs/feed-selected.png'),
                  iconColor: color.monoDarkMode.pale.dark,
                  selectedIconColor: color.accent.primary,
                  iconInsets: { top: 10, left: 0, bottom: -10, right: 0 },
                },
              },
            },
          },
          {
            stack: {
              id: STACK.TAB_MY_STREAMS,
              children: [
                {
                  component: {
                    name: ConsumingStreamProfilesScreenName,
                    passProps: currentTabIndex === 1 && props?.passProps,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/images/icons/tabs/streams.png'),
                  selectedIcon: require('../../assets/images/icons/tabs/streams-selected.png'),
                  iconColor: color.monoDarkMode.pale.dark,
                  selectedIconColor: color.accent.primary,
                  iconInsets: { top: 10, left: 0, bottom: -10, right: 0 },
                },
              },
            },
          },
          {
            stack: {
              id: STACK.TAB_WALLET,
              children: [
                {
                  component: {
                    name: WalletScreenName,
                    passProps: currentTabIndex === 2 && props?.passProps,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/images/icons/tabs/wallet.png'),
                  selectedIcon: require('../../assets/images/icons/tabs/wallet-selected.png'),
                  iconColor: color.monoDarkMode.pale.dark,
                  selectedIconColor: color.accent.primary,
                  iconInsets: { top: 10, left: 0, bottom: -10, right: 0 },
                },
              },
            },
          },
        ],
        options: {
          bottomTabs: {
            currentTabIndex,
            tabsAttachMode: 'onSwitchToTab',
          },
        },
      },
    },
  });
};


/**
 * Resets navigation stack to require update screen using STACK.REQUIRE_UDPATE
 */
export const goToRequireUpdateScreen = () => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.REQUIRE_UDPATE,
      children: [
        {
          component: {
            name: RequireUpdateScreenName,
          },
        },
      ],
    },
  },
});


/**
 * !UNUSED IN V1! (left in to allow tests to pass in ChannelLogin.test.tsx)
 * Resets navigation stack to channel screen using STACK.CHANNEL
 */
export const goToChannelStack = () => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.CHANNEL,
      children: [
        {
          component: {
            name: ChannelSelfScreenName,
          },
        },
      ],
    },
  },
});


/**
 * Utility to push screen
 * @param stack - STACK to push to, or ScreenProps.componentId can be used
 * @param screen - Screen class, ScreenName is aquired from the
 * @param props - Props of screen class
 */
type ExtractProps<P> = P extends FC<infer L> ? L : null;
export const pushScreen = <T extends FC>(stack: STACK | string, screen: T, props: ExtractProps<T>, options: Options = {}) => Navigation.push(stack, {
  component: {
    name: screen.prototype.ScreenName,
    passProps: props,
    options: {
      animations: {
        push: {
          waitForRender: true,
        },
      },
      ...options,
    },
  },
});


/**
 * Utility to open screen as modal
 * Sets the given stack so the stack can be used to push to
 * @param stack - STACK to push to
 * @param screen - Screen class, ScreenName is aquired from the
 * @param props - Props of screen class
 */
export const openScreenAsModal = <T extends FC>(
  stack: STACK,
  screen: T,
  props: ExtractProps<T>,
  modalTransitionStyle = OptionsModalTransitionStyle.crossDissolve,
) => Navigation.showModal({
    stack: {
      id: stack,
      children: [
        {
          component: {
            id: screen.prototype.ScreenName,
            name: screen.prototype.ScreenName,
            passProps: props,
            options: {
              modalTransitionStyle,
              modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
              animations: {
                showModal: {
                  waitForRender: true,
                },
              },
            },
          },
        },
      ],
    },
  });


/**
 * Opens an instance of ModalScreen on the current stack
 * Sets background color and modal presentation style
 * @param passProps - ModalScreenProps
 * @param id - optional id to be assigned to the modal, used for dismissal
 * @param modalTransitionStyle - optional OptionsModalTransitionStyle
 */
export const openModalScreen = (
  passProps: ModalScreenProps,
  id = ModalScreenName,
  modalTransitionStyle: OptionsModalTransitionStyle = OptionsModalTransitionStyle.coverVertical,
) => Navigation.showModal<ModalScreenProps>({
  component: {
    id,
    name: ModalScreenName,
    passProps,
    options: {
      layout: {
        backgroundColor: 'transparent',
        componentBackgroundColor: 'transparent',
      },
      modalTransitionStyle,
      modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
      animations: {
        showModal: {
          waitForRender: true,
        },
      },
    },
  },
});


export const openTopUpModal = () => {
  openModalScreen({
    component: (
      <Products />
    ),
  }, 'TopUpModal', OptionsModalTransitionStyle.crossDissolve);
};


/**
 * Utility to listen for when a screen 'didAppear' and set the mounted boolean to true
 * Used for conditional rendering, only when a screen appears, suitable for tab based navigation
 * @param screenName
 */
export const useMounted = (screenName: string) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const screenDidAppearEventListener = Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
      if (screenName === componentName) {
        setMounted(true);
      }
    });
    return () => screenDidAppearEventListener.remove();
  }, []);

  return mounted;
};
