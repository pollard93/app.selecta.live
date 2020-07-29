import React from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getStreamSelfsVariables, getStreamSelfs, getStreamSelfs_getStreamSelfs_streams } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItem from '../StreamSelfListItem/StreamSelfListItem';
import styles from './StreamSelfs.styles';
import H2 from '../../UI/Typography/components/H2';
import Button from '../../UI/Button/Button';

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
    ListHeaderComponent={() => (
      <View style={styles.header}>
        <H2>Stream Management</H2>
        <Button
          type="PRIMARY"
          title="Create New Stream"
          onPress={console.log}
          style={styles.createButton}
        />
      </View>
    )}
  />
);

export default StreamSelfs;
