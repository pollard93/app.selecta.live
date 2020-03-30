import React from 'react';
import { View, Text } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { CONSUMER_NOTIFICATION_FRAGMENT } from '../../../API/fragments/__generated__/CONSUMER_NOTIFICATION_FRAGMENT';

interface NotificationListItemProps {
  data: CONSUMER_NOTIFICATION_FRAGMENT;
}

const NotificationListItem = (props: NotificationListItemProps) => (
  <View>
    <Text>{props.data.type}</Text>
    <AsyncImage
      splashUrl={props.data?.sender?.profilePicture?.url?.splash}
      fullUrl={props.data?.sender?.profilePicture?.url?.full}
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

export default NotificationListItem;
