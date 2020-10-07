import React from 'react';
import { View } from 'react-native';
import { useDarkMode, useDynamicValue } from 'react-native-dynamic';
import { useGetSelf } from '../../../../../../API/query/getSelf/getSelf';
import Icon, { ICON } from '../../../../Icon/Icon';
import Styles, { DynamicStyles } from '../../Header.style';
import PulsingIcon from '../../../../PulsingIcon/PulsingIcon';
import scalePx from '../../../../../../utils/scalePx';
import { useScreenProps } from '../../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { NotificationsScreenName } from '../../../../../../screens/NotificationsScreen/NotificationsScreen';

const HeaderNotifications = () => {
  const self = useGetSelf();
  const darkMode = useDarkMode();
  const screenProps = useScreenProps();
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * No unread notifications
   */
  if (self.unreadNotificationCount === 0) {
    return (
      <View>
        {
          darkMode
            ? (
              <Icon
                name={ICON.NOTIFICATIONS_READ_LIGHT}
                size="regular"
                style={[Styles.icon, screenProps.name === NotificationsScreenName && Styles.iconSelected]}
              />
            )
            : (
              <Icon
                name={ICON.NOTIFICATIONS_READ_DARK}
                size="regular"
                style={[Styles.icon, screenProps.name === NotificationsScreenName && Styles.iconSelected]}
              />
            )
        }
      </View>
    );
  }


  /**
   * There is unread notifications
   */
  return (
    <View>
      <Icon
        name={ICON.NOTIFICATIONS_UNREAD}
        size="regular"
        style={[Styles.icon, screenProps.name === NotificationsScreenName && Styles.iconSelected]}
      />
      <View style={[Styles.pulsingIcon, dynamicStyles.wrap]}>
        <PulsingIcon
          size={scalePx(10)}
          duration={1000}
          delay={5000}
        />
      </View>
    </View>
  );
};

export default HeaderNotifications;
