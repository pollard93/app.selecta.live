/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { useDynamicValue } from 'react-native-dynamic';
import { GET_STREAM_MESSAGES_QUERY } from '../../../API/query/getStreamMessages/getStreamMessages';
import { getStreamMessagesVariables, getStreamMessages, getStreamMessages_getStreamMessages_messages } from '../../../API/query/getStreamMessages/__generated__/getStreamMessages';
import StreamMessageListItem from '../StreamMessageListItem/StreamMessageListItem';
import styles, { DynamicStyles } from './StreamMessages.styles';
import { STREAM_MESSAGES_SUBSCRIPTION } from '../../../API/subscription/streamMessages/streamMessages';
import { streamMessages, streamMessagesVariables } from '../../../API/subscription/streamMessages/__generated__/streamMessages';
import CreateStreamMessage from '../CreateStreamMessage/CreateStreamMessage';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';

class StreamMessagesFlatList extends ApolloFlatList<getStreamMessagesVariables, getStreamMessages, getStreamMessages_getStreamMessages_messages, streamMessagesVariables, streamMessages> {}

interface StreamMessagesProps {
  data: STREAM_PROFILE_FRAGMENT | STREAM_SELF_FRAGMENT;
}

const StreamMessages: FC<StreamMessagesProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  const variables = {
    id: props.data.id,
    first: 10,
    after: null,
  };

  return (
    <View style={[styles.wrap, dynamicStyles.wrap]}>
      <StreamMessagesFlatList
        query={GET_STREAM_MESSAGES_QUERY}
        variables={variables}
        accessor='getStreamMessages.messages'
        renderItem={({ item }) => (
          <StreamMessageListItem
            data={item}
            streamData={props.data}
          />
        )}
        FlatListProps={{
          inverted: true,
          ItemSeparatorComponent: () => <View style={styles.separator} />,
          contentContainerStyle: styles.contentContainer,
        }}
        ListFooterComponent={({ queryResult }) => {
          if (queryResult.loading || queryResult.error) {
            return (
              <LoadRetry {...queryResult} />
            );
          }

          return null;
        }}
        subscriptionOptions={{
          document: STREAM_MESSAGES_SUBSCRIPTION,
          variables: {
            id: props.data.id,
          },
          updateQuery: (prev, { subscriptionData }) => {
            // Only want to insert created nodes
            if (subscriptionData.data.streamMessages.mutation !== 'CREATED') return prev;

            /**
             * If id already exists in cache then return
             * CreateStreamMessage may have got there first
             */
            if (prev.getStreamMessages.messages.find((m) => m.id === subscriptionData.data.streamMessages.node.id)) return prev;

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
          onError: () => {
            // Die silently
          },
        }}
      />

      <CreateStreamMessage variables={variables} />
    </View>
  );
};

export default StreamMessages;
