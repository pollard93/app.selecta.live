import { Navigation, Layout, OptionsModalPresentationStyle, OptionsModalTransitionStyle } from 'react-native-navigation';
import { LoginScreenName } from '../LoginScreen/LoginScreen';
import { HomeScreenName, HomeScreenProps } from '../HomeScreen/HomeScreen';
import { LoginProps } from '../../components/Login/Login';
import { RequireUpdateScreenName } from '../RequireUpdateScreen/RequireUpdateScreen';
import { STACK } from './interfaces';
import { ModalScreenName, ModalScreenProps } from '../ModalScreen/ModalScreen';
import { ChannelScreenName } from '../ChannelScreen/ChannelScreen';


/**
 * Resets navigation stack to login screen using STACK.LOGIN
 * @param toastMessage - optional toast message to show on mount of login
 */
export const goToLogin = (passProps: LoginProps = {}) => Navigation.setRoot({
  root: {
    stack: {
      id: STACK.LOGIN,
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
 * Opens an instance of ModalScreen on the current stack
 * Sets background color and modal presentation style
 */
export const openModalScreen = (passProps: ModalScreenProps) => Navigation.showModal<ModalScreenProps>({
  component: {
    id: ModalScreenName,
    name: ModalScreenName,
    passProps,
    options: {
      layout: {
        backgroundColor: 'transparent',
      },
      modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
      modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
      topBar: {
        visible: false,
        animate: true,
      },
    },
  },
});
