/* eslint-disable max-len */
import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_STREAM_MESSAGES_QUERY } from '../../../API/query/getStreamMessages/getStreamMessages';
import { getStreamMessagesVariables, getStreamMessages, getStreamMessages_getStreamMessages_messages } from '../../../API/query/getStreamMessages/__generated__/getStreamMessages';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamMessageListItem from '../StreamMessageListItem/StreamMessageListItem';
import styles from './StreamMessages.styles';
import { STREAM_MESSAGES_SUBSCRIPTION } from '../../../API/subscription/streamMessages/streamMessages';
import { streamMessages, streamMessagesVariables } from '../../../API/subscription/streamMessages/__generated__/streamMessages';

class StreamMessagesFlatList extends ApolloFlatList<getStreamMessagesVariables, getStreamMessages, getStreamMessages_getStreamMessages_messages, streamMessagesVariables, streamMessages> {}

interface StreamMessagesProps {
  id: string;
}

const StreamMessages = (props: StreamMessagesProps) => (
  <StreamMessagesFlatList
    query={GET_STREAM_MESSAGES_QUERY}
    variables={{
      id: props.id,
      first: 5,
    }}
    accessor='getStreamMessages.messages'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <StreamMessageListItem data={item} />
      </View>
    )}
    LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
    ListHeaderComponent={() => (
      <Text>HEADER</Text>
    )}
    ListFooterComponent={(moreToLoad) => (
      <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
    )}
    subscriptionOptions={{
      document: STREAM_MESSAGES_SUBSCRIPTION,
      variables: {
        id: props.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        // Only want to insert created nodes
        if (subscriptionData.data.streamMessages.mutation !== 'CREATED') return prev;

        try {
          return {
            ...prev,
            getStreamMessages: {
              ...prev.getStreamMessages,
              messages: [subscriptionData.data.streamMessages.node, ...prev.getStreamMessages.messages],
              count: prev.getStreamMessages.count + 1,
            },
          };
        } catch (e) {
          return prev;
        }
      },
    }}
  />
);

export default StreamMessages;
