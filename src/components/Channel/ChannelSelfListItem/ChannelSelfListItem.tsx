import React from 'react';
import { Text, View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';

interface ChannelSelfListItemProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const ChannelSelfListItem = (props: ChannelSelfListItemProps) => (
  <View>
    <Text>{props.data.name}</Text>
    <AsyncImage
      splashUrl={props.data?.coverImage?.url?.splash}
      fullUrl={props.data?.coverImage?.url?.full}
      // eslint-disable-next-line global-require
      placeholderImageSource={require('../../../../icons/icon.jpg')}
      containerProps={{
        style: {
          width: 100,
          height: 100,
        },
      }}
    />
    <AsyncImage
      splashUrl={props.data?.profileImage?.url?.splash}
      fullUrl={props.data?.profileImage?.url?.full}
      // eslint-disable-next-line global-require
      placeholderImageSource={require('../../../../icons/icon.jpg')}
      containerProps={{
        style: {
          width: 100,
          height: 100,
        },
      }}
    />
  </View>
);

export default ChannelSelfListItem;
