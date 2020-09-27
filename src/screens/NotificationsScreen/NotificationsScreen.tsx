import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import Notifications, { NotificationsProps } from '../../components/Notification/Notifications/Notifications';

export interface NotificationsScreenProps extends NotificationsProps {}

const NotificationsScreen: FC<NotificationsScreenProps> = (props) => (
  <Notifications {...props} />
);

export default NotificationsScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
NotificationsScreen.prototype.ScreenName = 'NotificationsScreen';

/**
 * Set Screen options or remove to use default
 */
(NotificationsScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
};

/**
 * Set screen color options (default white)
 */
NotificationsScreen.prototype.fullScreen = true;
// NotificationsScreen.prototype.statusBarColor = color.mono.dark;
// NotificationsScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const NotificationsScreenName = NotificationsScreen.prototype.ScreenName;
