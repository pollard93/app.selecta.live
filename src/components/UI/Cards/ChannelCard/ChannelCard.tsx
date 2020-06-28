import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { CHANNEL_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT_SHORT';
import Styles from './ChannelCard.style';
import { pushScreenV2 } from '../../../../screens/utils';
import { STACK } from '../../../../screens/utils/interfaces';
import ChannelProfileScreen from '../../../../screens/ChannelProfileScreen/ChannelProfileScreen';

interface ChannelCardProps {
  data: CHANNEL_PROFILE_FRAGMENT_SHORT;
}

const ChannelCard: FC<ChannelCardProps> = (props) => (
  <TouchableOpacity
    onPress={() => {
      pushScreenV2(STACK.TAB_HOME, ChannelProfileScreen, { id: props.data.id });
    }}
  >
    <AsyncImage
      splashUrl={props.data.profileImage?.url.splash}
      fullUrl={props.data.profileImage?.url.large}
      containerProps={{
        style: Styles.image,
      }}
    />
  </TouchableOpacity>
);

export default ChannelCard;
