import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles from './StreamSelfListItem.style';
import Body from '../../UI/Typography/components/Body';
import H3 from '../../UI/Typography/components/H3';
import { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';

interface StreamSelfListItemSkeletonProps {}

const StreamSelfListItemSkeleton: FC<StreamSelfListItemSkeletonProps> = () => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View>
      <View style={Styles.banner}>
        <Body style={Styles.bannerHeaderSkeleton}>
          Live On:
        </Body>
      </View>

      <View style={Styles.body}>
        <View style={Styles.header}>
          <View style={Styles.title}>
            <H3 skeleton>Name</H3>
          </View>

          <View style={[Styles.image, Styles.skeletonImageWrap, globalDynamicStyles.skeleton]}>
            <Image
              source={require('../../../assets/images/logo-icon.png')}
              style={Styles.skeletonImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={Styles.details}>
          <View style={Styles.detail}>
            <Body skeleton>Tags</Body>
            <Body skeleton>Ticket Price</Body>
            <Body skeleton>Stream Duration</Body>
          </View>
          <View style={Styles.meta}>
            <Body skeleton>Streams:</Body>
            <Body skeleton>Purchases:</Body>
          </View>
        </View>

        <Body bold skeleton>Info</Body>
        <Body bold skeleton>Info</Body>
      </View>
    </View>
  );
};

export default StreamSelfListItemSkeleton;
