import React, { FC } from 'react';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { CHANNEL_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT_SHORT';
import Styles from './ChannelCard.style';

interface ChannelCardProps {
  data: CHANNEL_PROFILE_FRAGMENT_SHORT;
}

const ChannelCard: FC<ChannelCardProps> = (props) => (
  <AsyncImage
    splashUrl={props.data.profileImage?.url.splash}
    fullUrl={props.data.profileImage?.url.large}
    containerProps={{
      style: Styles.image,
    }}
  />
);

export default ChannelCard;
