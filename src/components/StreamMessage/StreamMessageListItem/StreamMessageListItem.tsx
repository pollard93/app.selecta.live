import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_MESSAGE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_MESSAGE_FRAGMENT';

interface StreamMessageListItemProps {
  data: STREAM_MESSAGE_FRAGMENT;
}

const StreamMessageListItem = (props: StreamMessageListItemProps) => (
  <View>
    <Text>{props.data.message}</Text>
    <AsyncImage
      splashUrl={props.data?.user?.profilePicture?.url?.splash}
      fullUrl={props.data?.user?.profilePicture?.url?.full}
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

export default StreamMessageListItem;
