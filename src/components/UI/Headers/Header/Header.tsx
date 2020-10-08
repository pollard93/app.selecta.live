import React, { FC } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue, DynamicValue } from 'react-native-dynamic';
import { Navigation } from 'react-native-navigation';
import Styles, { DynamicStyles } from './Header.style';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import Icon, { ICON } from '../../Icon/Icon';
import useSafeArea from '../../../../modules/SafeAreaInsets/SafeAreaInsets';
import { pushScreen } from '../../../../screens/utils';
import ProfileScreen, { ProfileScreenName } from '../../../../screens/ProfileScreen/ProfileScreen';
import NotificationsScreen, { NotificationsScreenName } from '../../../../screens/NotificationsScreen/NotificationsScreen';
import HeaderNotifications from './components/HeaderNotifications/HeaderNotifications';
import scalePx from '../../../../utils/scalePx';
import { useScreenProps } from '../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import GlobalStyles, { GlobalDynamicStyles } from '../../../../styles/stylesheets/GlobalStyles';
import { useGetChannelSelfQuery } from '../../../../API/query/getChannelSelf/getChannelSelf';

interface HeaderProps {
  onPop?: () => void;
  onPressLogo?: () => void;
}


/**
 * Styles which can be used in other components
 */
export const useHeaderStyles = () => ({
  headerHeight: scalePx(35),
  headerZindex: 100,
});


const Header: FC<HeaderProps> = (props) => {
  const { data } = useGetChannelSelfQuery({ fetchPolicy: 'cache-only' });
  console.log('data', data);
  const screenProps = useScreenProps();
  const safeAreaInsets = useSafeArea();
  const { headerHeight, headerZindex } = useHeaderStyles();
  const self = useGetSelf();
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);
  const lightLogo = require('../../../../assets/images/logo-dark.png');
  const darkLogo = require('../../../../assets/images/logo-light.png');
  const logoUri = new DynamicValue(lightLogo, darkLogo);


  /**
   * Open profile modal
   */
  const onPressProfile = () => {
    pushScreen(screenProps.componentId, ProfileScreen, {});
  };


  /**
   * Open notifications modal
   */
  const onPressNotifications = () => {
    pushScreen(screenProps.componentId, NotificationsScreen, {});
  };


  /**
   * Pop to root
   */
  const onPopToRoot = () => {
    Navigation.popToRoot(screenProps.componentId);
  };


  return (
    <View
      style={[
        Styles.wrap,
        dynamicStyles.wrap,
        {
          paddingTop: safeAreaInsets.top,
          zIndex: headerZindex,
        },
      ]}
    >
      <View
        style={[
          Styles.inner,
          safeAreaInsets.top === 0 && Styles.noSafeArea,
          { height: headerHeight },
        ]}
      >
        <View style={Styles.left}>
          {props.onPop && (
            <TouchableOpacity
              onPress={props.onPop}
              style={Styles.back}
            >
              <Icon name={ICON.ARROW_BACKWARD} size="xsmall" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={props.onPressLogo || onPopToRoot}
            style={Styles.logoWrap}
            disabled={!props.onPop && !props.onPressLogo}
          >
            <Image
              source={useDynamicValue(logoUri)}
              style={Styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={Styles.right}>
          <TouchableOpacity
            onPress={onPressNotifications}
            style={Styles.iconWrap}
            disabled={screenProps.name === NotificationsScreenName}
          >
            <HeaderNotifications />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressProfile}
            style={Styles.iconWrap}
            disabled={screenProps.name === ProfileScreenName}
          >
            <View style={Styles.profilePictureIconWrap}>
              <Icon
                name={ICON.PROFILE}
                size="regular"
                style={[Styles.icon, screenProps.name === ProfileScreenName && Styles.iconSelected]}
              />
            </View>
            {
              self.profilePicture && (
                <AsyncImage
                  splashUrl={self.profilePicture.url.splash}
                  fullUrl={self.profilePicture.url.small}
                  containerProps={{
                    style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner, screenProps.name === ProfileScreenName && Styles.profileSelected],
                  }}
                />
              )
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
