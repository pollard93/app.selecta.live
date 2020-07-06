import React, { FC } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { FEED_PAYLOAD_FRAGMENT } from '../../../API/fragments/__generated__/FEED_PAYLOAD_FRAGMENT';
import Styles from './Feed.styles';
import FeedItem from './FeedItem';

interface FeedProps {
  data: FEED_PAYLOAD_FRAGMENT;
  flatListProps?: Partial<FlatListProps<any>>;
}

const Feed: FC<FeedProps> = (props) => (
  <FlatList
    bounces={false}
    {...props.flatListProps}
    data={props.data.items}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[Styles[`background${props.data.items[0].background}`], props.flatListProps?.contentContainerStyle]}
    renderItem={(a) => <FeedItem {...a} />}
    keyExtractor={(item, index) => `${item.heading}${index}`}
  />
);

export default Feed;
