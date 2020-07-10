import React, { FC } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { FEED_PAYLOAD_FRAGMENT } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
import { DynamicStyles } from './Feed.styles';
import FeedItem from './FeedItem';

interface FeedProps {
  data: FEED_PAYLOAD_FRAGMENT;
  flatListProps?: Partial<FlatListProps<any>>;
}

const Feed: FC<FeedProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <FlatList
      bounces={false}
      {...props.flatListProps}
      data={props.data.items}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[dynamicStyles[`background${props.data.items[0].background}`], props.flatListProps?.contentContainerStyle]}
      renderItem={(a) => <FeedItem {...a} />}
      keyExtractor={(item, index) => `${item.heading}${index}`}
    />
  );
};

export default Feed;
