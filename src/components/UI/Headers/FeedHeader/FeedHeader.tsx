/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FC } from 'react';
import { Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useToast } from 'mbp-components-rn-toast';
import Styles from './FeedHeader.style';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import Body from '../../Typography/components/Body';
import Icon, { ICON } from '../../Icon/Icon';
import useSafeArea from '../../../../modules/SafeAreaInsets/SafeAreaInsets';

interface FeedHeaderProps {
  onPop?: () => void;
}

const FeedHeader: FC<FeedHeaderProps> = (props) => {
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
