import React, { FC, useState } from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { FEED_PAYLOAD_FRAGMENT } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
import { DynamicStyles } from './Feed.styles';
import FeedItem from './FeedItem';

interface FeedProps {
  data: FEED_PAYLOAD_FRAGMENT;
  refetch?: () => Promise<any>;
  flatListProps?: Partial<FlatListProps<any>>;
}

const Feed: FC<FeedProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * Handle pull down to refresh
   */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await props.refetch();
    } catch (e) {} // eslint-disable-line no-empty

    setRefreshing(false);
  };


  return (
    <FlatList
      bounces={false}
      {...props.flatListProps}
      data={props.data.items}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[dynamicStyles[`background${props.data.items[0].background}`], props.flatListProps?.contentContainerStyle]}
      renderItem={(a) => <FeedItem {...a} />}
      keyExtractor={(item, index) => `${item.heading}${index}`}
      refreshControl={
        props.refetch
          ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )
          : undefined
      }
    />
  );
};

export default Feed;
