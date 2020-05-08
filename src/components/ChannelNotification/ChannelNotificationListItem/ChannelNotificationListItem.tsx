import React from 'react';
import { View, Text } from 'react-native';
import { CHANNEL_NOTIFICATION_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_NOTIFICATION_FRAGMENT';

interface ChannelNotificationListItemProps {
  data: CHANNEL_NOTIFICATION_FRAGMENT;
}

const ChannelNotificationListItem = (props: ChannelNotificationListItemProps) => (
  <View>
    <Text>{props.data.type}</Text>
  </View>
);

export default ChannelNotificationListItem;
