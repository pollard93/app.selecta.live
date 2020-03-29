import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_STREAM_FEED_QUERY } from '../../API/query/getStreamFeed/getStreamFeed';
import { getStreamFeedVariables, getStreamFeed, getStreamFeed_getStreamFeed_streams } from '../../API/query/getStreamFeed/__generated__/getStreamFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import StreamListItem from '../Stream/StreamListItem/StreamListItem';
import styles from './StreamFeed.styles';

class StreamFeedFlatList extends ApolloFlatList<getStreamFeedVariables, getStreamFeed, getStreamFeed_getStreamFeed_streams> {}

const StreamFeed = () => (
  <StreamFeedFlatList
    query={GET_STREAM_FEED_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getStreamFeed.streams'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <StreamListItem data={item} />
      </View>
    )}
    LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
    ListHeaderComponent={() => (
      <Text>HEADER</Text>
    )}
    ListFooterComponent={(moreToLoad) => (
      <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
    )}
  />
);

export default StreamFeed;
