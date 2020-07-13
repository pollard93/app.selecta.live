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
import scalePx from '../../../../utils/scalePx';

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

  return (
    <View style={[Styles.outer, { zIndex: headerZindex }]}>
      <View
        style={[
          Styles.wrap,
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
