import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_REQUESTED_CHANNELS_QUERY } from '../../../API/query/getRequestedChannels/getRequestedChannels';
import { getRequestedChannelsVariables, getRequestedChannels, getRequestedChannels_getRequestedChannels_channels } from '../../../API/query/getRequestedChannels/__generated__/getRequestedChannels';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import RequestedChannelListItem from '../RequestedChannelListItem/RequestedChannelListItem';
import styles from './RequestedChannels.styles';

class RequestedChannelsFlatList extends ApolloFlatList<getRequestedChannelsVariables, getRequestedChannels, getRequestedChannels_getRequestedChannels_channels> {}

const RequestedChannels = () => (
  <RequestedChannelsFlatList
    query={GET_REQUESTED_CHANNELS_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getRequestedChannels.channels'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <RequestedChannelListItem data={item} />
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

export default RequestedChannels;
