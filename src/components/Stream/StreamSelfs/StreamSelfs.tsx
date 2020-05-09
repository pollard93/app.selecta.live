import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import styles from './StreamSelfs.styles';

class StreamSelfsFlatList extends ApolloFlatList<getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams> {}

const StreamSelfs = () => (
  <StreamSelfsFlatList
    query={GET_STREAM_SELFS_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getStreamSelfs.streams'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <StreamSelfListItem data={item} />
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

export default StreamSelfs;
