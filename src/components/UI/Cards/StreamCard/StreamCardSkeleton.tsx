import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Body from '../../Typography/components/Body';
import H4 from '../../Typography/components/H4';
import Chip from '../../Chip/Chip';
import Styles from './StreamCard.style';
import { GlobalDynamicStyles } from '../../../../styles/stylesheets/GlobalStyles';

const StreamCardSkeleton: FC = () => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={Styles.wrap}>
      <View style={[Styles.image, Styles.skeletonImageWrap, globalDynamicStyles.skeleton]}>
        <Image
          source={require('../../../../assets/images/logo-icon.png')}
          style={Styles.skeletonImage}
          resizeMode="contain"
        />
      </View>
      <View style={Styles.item}>
        <H4 skeleton>NAME</H4>
      </View>

      <View style={Styles.item}>
        <Body skeleton style={Styles.skeletonTags}>Tags Tags</Body>
      </View>

      <View style={[Styles.item, Styles.lower]}>
        <Chip type="SKELETON" style={Styles.channelNameChip}>Channel name</Chip>

        <View style={Styles.chips}>
          <Chip type="SKELETON" bold style={Styles.chipLeft}>TIME LEFT</Chip>
          <Chip type="SKELETON" bold>TIME RIGHT</Chip>
        </View>
      </View>
    </View>
  );
};

export default StreamCardSkeleton;
