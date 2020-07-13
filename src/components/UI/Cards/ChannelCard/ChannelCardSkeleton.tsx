import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles from './ChannelCard.style';
import { GlobalDynamicStyles } from '../../../../styles/stylesheets/GlobalStyles';

const ChannelCardSkeleton: FC = () => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={[globalDynamicStyles.skeleton, Styles.skeletonWrap]}>
      <Image
        source={require('../../../../assets/images/logo-icon.png')}
        style={Styles.skeletonImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default ChannelCardSkeleton;
