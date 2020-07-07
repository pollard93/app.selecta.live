/* eslint-disable max-len */
import React, { FC, useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { FlatList } from 'react-native-gesture-handler';
import { GET_STREAM_MESSAGES_VOD_QUERY, useGetStreamMessagesVodQuery } from '../../../API/query/getStreamMessagesVod/getStreamMessagesVod';
import { getStreamMessagesVodVariables, getStreamMessagesVod, getStreamMessagesVod_getStreamMessagesVod_messages } from '../../../API/query/getStreamMessagesVod/__generated__/getStreamMessagesVod';
import StreamMessageListItem from '../StreamMessageListItem/StreamMessageListItem';
import styles from './StreamMessagesVod.styles';
import { streamMessages, streamMessagesVariables } from '../../../API/subscription/streamMessages/__generated__/streamMessages';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';

interface StreamMessagesVodProps {
  id: string;
}

const StreamMessagesVod: FC<StreamMessagesVodProps> = (props) => {
  const { data: { getStreamProfile } } = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });

  /**
   * On init, get 20 messages from the current position
   */
  const variables = useRef<getStreamMessagesVodVariables>({
    id: props.id,
    from: getStreamProfile.position
      ? new Date(new Date(getStreamProfile.timeFrom).getTime() + getStreamProfile.position * 1000).toISOString()
      : getStreamProfile.timeFrom,
    last: 20,
    after: null,
  }).current;


  const queryResult = useGetStreamMessagesVodQuery({
    variables,
  });

  const fetchingMore = useRef(false);
  const noMoreToFetch = useRef(false);

  if (queryResult.loading || queryResult.error || !queryResult.data?.getStreamMessagesVod) {
    return <LoadRetry {...queryResult} />;
  }


  console.log('getStreamProfile.position', getStreamProfile.position);
  const currentPositionTime = new Date(new Date(getStreamProfile.timeFrom).getTime() + getStreamProfile.position * 1000);
  const messagesToDisplay = queryResult.data.getStreamMessagesVod.messages.reduce((a, c) => {
    if (new Date(c.createdAt) <= currentPositionTime) {
      a.push(c);
    }
    return a;
  }, []);
  console.log('messagesToDisplay', messagesToDisplay.length);
  console.log('queryResult.data.getStreamMessagesVod.messages.length', queryResult.data.getStreamMessagesVod.messages.length);


  /**
   * If displaying all messages except the last 10
   * Fetch more results
   */
  if (
    !noMoreToFetch.current
    && !fetchingMore.current
    && messagesToDisplay.length >= queryResult.data.getStreamMessagesVod.messages.length - 10
  ) {
    (async () => {
      // Set fetchingMore
      fetchingMore.current = true;
      console.log('fetching more');

      try {
        await queryResult.fetchMore({
          variables: {
            ...variables,
            after: queryResult.data.getStreamMessagesVod.messages[0].id,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            console.log('fetchMoreResult', fetchMoreResult);

            const newMessages = [...fetchMoreResult.getStreamMessagesVod.messages, ...prev.getStreamMessagesVod.messages];
            if (newMessages.length >= fetchMoreResult.getStreamMessagesVod.count) {
              noMoreToFetch.current = true;
            }

            return {
              getStreamMessagesVod: {
                ...prev.getStreamMessagesVod,
                ...fetchMoreResult.getStreamMessagesVod,
                messages: newMessages,
              },
            };
          },
        });

        fetchingMore.current = false;
      } catch (e) {
        console.log('e', e);
        fetchingMore.current = false;
      }
    })();
  }


  return (
    <View style={styles.wrap}>
      <FlatList
        bounces={false}
        inverted
        data={messagesToDisplay}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Text>{item.createdAt}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StreamMessagesVod;
