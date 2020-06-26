import { Navigation, Layout, OptionsModalPresentationStyle, OptionsModalTransitionStyle } from 'react-native-navigation';
import { useState, useEffect, FC } from 'react';
import { LoginScreenName } from '../LoginScreen/LoginScreen';
import { HomeScreenName, HomeScreenProps } from '../HomeScreen/HomeScreen';
import { LoginProps } from '../../components/Login/Login';
import { RequireUpdateScreenName } from '../RequireUpdateScreen/RequireUpdateScreen';
import { STACK } from './interfaces';
import { ModalScreenName, ModalScreenProps } from '../ModalScreen/ModalScreen';
import { ChannelScreenName } from '../ChannelScreen/ChannelScreen';
import OnboardingWelcomeScreen, { OnboardingWelcomeScreenName } from '../OnboardingScreens/OnboardingWelcomeScreen/OnboardingWelcomeScreen';


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


/**
 * Resets navigation stack to home screen using STACK.HOME
 */
export const goHome = (passProps: HomeScreenProps = {}) => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.HOME,
      children: [
        {
          component: {
            name: HomeScreenName,
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
 * Resets navigation stack to channel screen using STACK.CHANNEL
 */
export const goToChannelStack = () => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.CHANNEL,
      children: [
        {
          component: {
            name: ChannelScreenName,
          },
        },
      ],
    },
  },
});


/**
 * Utilty to push screen, this should be used to ensure a stack is used
 * Pass the 'Props' generic to ensure any changes in props are caught
 */
export const pushScreen = <Props extends {}>(stack: STACK, layout: Layout<Props>) => Navigation.push<Props>(stack, layout);


/**
 * Utility to push screen
 * @param stack - STACK to push to
 * @param screen - Screen class, ScreenName is aquired from the
 * @param props - Props of screen class
 */
type ExtractProps<P> = P extends FC<infer L> ? L : null;
export const pushScreenV2 = <T extends FC>(stack: STACK, screen: T, props: ExtractProps<T>) => Navigation.push<ExtractProps<T>>(stack, {
  component: {
    name: screen.prototype.ScreenName,
    passProps: props,
    options: {
      animations: {
        push: {
          waitForRender: true,
        },
      },
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
export const openScreenAsModal = <T extends FC>(stack: STACK, screen: T, props: ExtractProps<T>) => Navigation.showModal<T>({
  stack: {
    id: stack,
    children: [
      {
        component: {
          id: screen.prototype.ScreenName,
          name: screen.prototype.ScreenName,
          passProps: props,
          options: {
            modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
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
 */
export const openModalScreen = (passProps: ModalScreenProps, id = ModalScreenName) => Navigation.showModal<ModalScreenProps>({
  component: {
    id,
    name: ModalScreenName,
    passProps,
    options: {
      layout: {
        backgroundColor: 'transparent',
        componentBackgroundColor: 'transparent',
      },
      modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
      modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
      animations: {
        showModal: {
          waitForRender: true,
        },
      },
    },
  },
});


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
