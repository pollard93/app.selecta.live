import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CHANNEL_STREAMS_QUERY } from '../../../API/query/getChannelStreams/getChannelStreams';
import { getChannelStreamsVariables, getChannelStreams, getChannelStreams_getChannelStreams_streams } from '../../../API/query/getChannelStreams/__generated__/getChannelStreams';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamListItem from '../StreamListItem/StreamListItem';
import styles from './ChannelStreams.styles';

class ChannelStreamsFlatList extends ApolloFlatList<getChannelStreamsVariables, getChannelStreams, getChannelStreams_getChannelStreams_streams> {}

interface ChannelStreamsProps {
  id: string;
}

const ChannelStreams = (props: ChannelStreamsProps) => (
  <ChannelStreamsFlatList
    query={GET_CHANNEL_STREAMS_QUERY}
    variables={{
      id: props.id,
      first: 5,
    }}
    accessor='getChannelStreams.streams'
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

export default ChannelStreams;
