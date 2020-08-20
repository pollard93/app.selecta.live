import React, { FC, useState, useMemo } from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { ApolloQueryResult } from 'apollo-client';
import { FEED_PAYLOAD_FRAGMENT } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
import { DynamicStyles } from './Feed.styles';
import FeedItem from './FeedItem';

interface FeedProps {
  data: FEED_PAYLOAD_FRAGMENT;
  onPressStream: (id: string) => void;
  onPressChannel: (id: string) => void;
  refetch?: () => Promise<any>;
  flatListProps?: Partial<FlatListProps<any>>;
}

const Feed: FC<FeedProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const refetchRefs = useMemo<{[key:string]:() => Promise<ApolloQueryResult<unknown>>}>(() => ({}), []);


  /**
   * Handle pull down to refresh
   */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    // Refetch main query
    try {
      await props.refetch();
    } catch (e) {} // eslint-disable-line no-empty

    // Loop all refetchRefs and execute
    for (const ref of Object.values(refetchRefs)) {
      ref();
    }

    setRefreshing(false);
  };


  return (
    <FlatList
      {...props.flatListProps}
      data={props.data.items}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[dynamicStyles[`background${props.data.items[0].background}`], props.flatListProps?.contentContainerStyle]}
      renderItem={(a) => (
        <FeedItem
          renderInfo={a}
          onPressStream={props.onPressStream}
          onPressChannel={props.onPressChannel}
          refetchRefs={refetchRefs}
        />
      )}
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
