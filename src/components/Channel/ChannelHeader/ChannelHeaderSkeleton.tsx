import React, { useRef, FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';
import Styles from './ChannelHeader.style';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';

const ChannelHeaderSkeleton: FC = () => {
  const profileImageHeight = useRef(scalePx(120));
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={GlobalStyles.PageFill}>
      <View style={[
        Styles.skeletonCoverImage,
        globalDynamicStyles.skeleton,
      ]}>
        <Image
          source={require('../../../assets/images/logo-icon.png')}
          style={Styles.skeletonCoverImageIcon}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          height: profileImageHeight.current / 2,
          width: profileImageHeight.current,
          paddingHorizontal: spacing.small,
        }}
      >
        <View
          style={[
            Styles.profileImageWrap,
            {
              width: profileImageHeight.current,
              height: profileImageHeight.current,
            },
            Styles.skeletonProfileImage,
            globalDynamicStyles.skeleton,
          ]}
        >
          <Image
            source={require('../../../assets/images/logo-icon.png')}
            style={Styles.skeletonProfileImageIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={Styles.channelName}>
        <H2 skeleton>Channel Name</H2>
      </View>
    </View>
  );
};

export default ChannelHeaderSkeleton;
