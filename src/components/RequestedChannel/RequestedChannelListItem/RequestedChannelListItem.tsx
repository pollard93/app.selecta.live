import React from 'react';
import { View, Text } from 'react-native';
import { REQUESTED_CHANNEL_FRAGMENT } from '../../../API/fragments/__generated__/REQUESTED_CHANNEL_FRAGMENT';

interface RequestedChannelListItemProps {
  data: REQUESTED_CHANNEL_FRAGMENT;
}

const RequestedChannelListItem = (props: RequestedChannelListItemProps) => (
  <View>
    <Text>{props.data.name}</Text>
  </View>
);

export default RequestedChannelListItem;
