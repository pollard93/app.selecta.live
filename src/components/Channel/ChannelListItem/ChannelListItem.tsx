import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { CHANNEL_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_PROFILE_FRAGMENT';

interface ChannelListItemProps {
  data: CHANNEL_PROFILE_FRAGMENT;
}

const ChannelListItem = (props: ChannelListItemProps) => (
  <View>
    <Text>{props.data.name}</Text>
    <AsyncImage
      splashUrl={props.data?.profileImage?.url?.splash}
      fullUrl={props.data?.profileImage?.url?.full}
      // eslint-disable-next-line global-require
      placeholderImageSource={require('../../../../icon.jpg')}
      containerProps={{
        style: {
          width: 100,
          height: 100,
        },
      }}
    />
  </View>
);

export default ChannelListItem;
