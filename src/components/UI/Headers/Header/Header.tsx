/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FC } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import Styles from './Header.style';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import Body from '../../Typography/components/Body';
import Icon, { ICON } from '../../Icon/Icon';
import useSafeArea from '../../../../modules/SafeAreaInsets/SafeAreaInsets';

interface HeaderProps {
  onPop?: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const self = useGetSelf();
  const credit = Math.min(999, self.credit);

  return (
    <View style={Styles.outer}>
      <View style={[Styles.wrap, { paddingTop: safeAreaInsets.top }]}>
        <View style={Styles.inner}>
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
                source={require('../../../../assets/images/logo-dark.png')}
                style={Styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={Styles.right}>
            <View style={Styles.wallet}>
              <Icon style={Styles.walletIcon} name={ICON.WALLET} size="small" />
              <Body>{self.credit > 999 ? `${credit}+` : credit}</Body>
            </View>

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
