import React, { FC } from 'react';
import { View, Image } from 'react-native';
import Styles from './ChannelCard.style';

const ChannelCardSkeleton: FC = () => (
  <View style={Styles.skeletonWrap}>
    <Image
      source={require('../../../../assets/images/logo-icon.png')}
      style={Styles.skeletonImage}
      resizeMode="contain"
    />
  </View>
);

export default ChannelCardSkeleton;
