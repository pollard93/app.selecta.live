import React from 'react';
import { View, Text } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { getStreamFeed_getStreamFeed_streams } from '../../../API/query/getStreamFeed/__generated__/getStreamFeed';

interface StreamListItemProps {
  data: getStreamFeed_getStreamFeed_streams;
}

const StreamListItem = (props: StreamListItemProps) => (
  <View>
    <Text>{props.data.name}</Text>
    <AsyncImage
      splashUrl={props.data?.image?.url?.splash}
      fullUrl={props.data?.image?.url?.full}
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

export default StreamListItem;
