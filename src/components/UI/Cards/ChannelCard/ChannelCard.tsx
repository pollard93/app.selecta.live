import React, { FC } from 'react';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { CHANNEL_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT_SHORT';
import Styles from './ChannelCard.style';
import color from '../../../../styles/definitions/color';
import { GlobalDynamicStyles } from '../../../../styles/stylesheets/GlobalStyles';

interface ChannelCardProps {
  data: CHANNEL_PROFILE_FRAGMENT_SHORT;
}

const ChannelCard: FC<ChannelCardProps> = (props) => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <AsyncImage
      splashUrl={props.data.profileImage?.url.splash}
      fullUrl={props.data.profileImage?.url.large}
      placeholderImageProps={{
        source: require('../../../../assets/images/logo-icon.png'),
        resizeMode: 'center',
        style: Styles.skeletonImage,
      }}
      containerProps={{
        style: [Styles.image, globalDynamicStyles.skeleton],
      }}
    />
  );
};

export default ChannelCard;
