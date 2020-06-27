/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FC } from 'react';
import { Image, View, SafeAreaView } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import Styles from './FeedHeader.style';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import Body from '../../Typography/components/Body';
import Icon, { ICON } from '../../Icon/Icon';

interface FeedHeaderProps {}

const FeedHeader: FC<FeedHeaderProps> = () => {
  const self = useGetSelf();
  const credit = Math.min(999, self.credit);

  return (
    <View style={Styles.outer}>
      <View style={Styles.wrap}>
        <SafeAreaView />
        <View style={Styles.inner}>
          <View style={Styles.logoWrap}>
            <Image
              source={require('../../../../assets/images/logo-dark.png')}
              style={Styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={Styles.right}>
            <View style={Styles.wallet}>
              {/* TODO - icon */}
              <Icon style={Styles.walletIcon} name={ICON.SEARCH} size="small" />
              <Body>{self.credit > 999 ? `${credit}+` : credit}</Body>
            </View>
            {
              self.profilePicture
                ? (
                  <AsyncImage
                    splashUrl={self.profilePicture.url.splash}
                    fullUrl={self.profilePicture.url.small}
                    containerProps={{
                      style: Styles.profilePicture,
                    }}
                  />
                )
                : <Icon name={ICON.SEARCH} size="small" /> /* TODO - icon */
            }
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;
