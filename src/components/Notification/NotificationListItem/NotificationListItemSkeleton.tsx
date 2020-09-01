import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles from './NotificationListItem.styles';
import { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import Body from '../../UI/Typography/components/Body';

interface NotificationListItemSkeletonProps {}

const NotificationListItemSkeleton: FC<NotificationListItemSkeletonProps> = () => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={[Styles.wrap, Styles.skeletonContentWrap]}>
      <View style={Styles.pulse} />

      <View style={[Styles.image, Styles.skeletonImageWrap, globalDynamicStyles.skeleton]}>
        <Image
          source={require('../../../assets/images/logo-icon.png')}
          style={[Styles.skeletonImage, globalDynamicStyles.skeleton]}
          resizeMode="contain"
        />
      </View>

      <View style={Styles.content}>
        <Body skeleton>content</Body>
      </View>
    </View>
  );
};

export default NotificationListItemSkeleton;
