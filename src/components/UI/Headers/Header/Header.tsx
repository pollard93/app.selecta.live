/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FC } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue, DynamicValue } from 'react-native-dynamic';
import { Navigation } from 'react-native-navigation';
import Styles, { DynamicStyles } from './Header.style';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import Body from '../../Typography/components/Body';
import Icon, { ICON } from '../../Icon/Icon';
import useSafeArea from '../../../../modules/SafeAreaInsets/SafeAreaInsets';
import scalePx from '../../../../utils/scalePx';
import { openModalScreen } from '../../../../screens/utils';
import Wallet from '../../../Wallet/Wallet';

interface HeaderProps {
  onPop?: () => void;
}


/**
 * If ther is a safe area inset at the top of the screen
 * Header height will be smaller as padding top is not required
 */
export const useHeaderStyles = () => {
  const safeAreaInsets = useSafeArea();
  return ({
    headerHeight: safeAreaInsets.top === 0 ? scalePx(50) : scalePx(35),
    headerZindex: 100,
  });
};


const Header: FC<HeaderProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const { headerHeight, headerZindex } = useHeaderStyles();
  const self = useGetSelf();
  const credit = Math.min(999, self.credit);
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const lightLogo = require('../../../../assets/images/logo-dark.png');
  const darkLogo = require('../../../../assets/images/logo-white.png');
  const logoUri = new DynamicValue(lightLogo, darkLogo);


  /**
   * Open wallet
   */
  const onPressWallet = () => {
    openModalScreen({
      component: (
        <Wallet
          onDismiss={() => {
            Navigation.dismissModal('WalletModal');
          }}
        />
      ),
    }, 'WalletModal');
  };


  return (
    <View style={[Styles.outer, { zIndex: headerZindex }]}>
      <View
        style={[
          Styles.wrap,
          dynamicStyles.wrap,
          {
            paddingTop: safeAreaInsets.top,
            borderBottomLeftRadius: headerHeight / 2,
            borderBottomRightRadius: headerHeight / 2,
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

            <View style={Styles.logoWrap}>
              <Image
                source={useDynamicValue(logoUri)}
                style={Styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={Styles.right}>
            <TouchableOpacity
              style={Styles.wallet}
              onPress={() => onPressWallet()}
            >
              <Icon style={Styles.walletIcon} name={ICON.WALLET} size="small" />
              <Body>{self.credit > 999 ? `${credit}+` : credit}</Body>
            </TouchableOpacity>

            <View style={Styles.profilePicture}>
              {
                self.profilePicture
                  ? (
                    <AsyncImage
                      splashUrl={self.profilePicture.url.splash}
                      fullUrl={self.profilePicture.url.small}
                      containerProps={{
                        style: Styles.profilePictureInner,
                      }}
                    />
                  )
                  : (
                    <Icon
                      name={ICON.PROFILE}
                      size="regular"
                      style={Styles.profilePictureIcon}
                    />
                  )
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
