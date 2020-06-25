/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FC } from 'react';
import { Image, View, SafeAreaView } from 'react-native';
import Styles from './FeedHeader.style';

interface FeedHeaderProps {}

const FeedHeader: FC<FeedHeaderProps> = () => (
  <View style={Styles.wrap}>
    <SafeAreaView />
    <View style={Styles.logoWrap}>
      <Image
        source={require('../../../../assets/images/logo-dark.png')}
        style={Styles.logo}
        resizeMode="contain"
      />
    </View>
  </View>
);

export default FeedHeader;
