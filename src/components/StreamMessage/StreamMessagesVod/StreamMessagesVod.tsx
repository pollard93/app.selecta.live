/* eslint-disable max-len */
import React, { FC, useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useGetStreamMessagesVodQuery } from '../../../API/query/getStreamMessagesVod/getStreamMessagesVod';
import { getStreamMessagesVodVariables } from '../../../API/query/getStreamMessagesVod/__generated__/getStreamMessagesVod';
import StreamMessageListItem from '../StreamMessageListItem/StreamMessageListItem';
import styles from './StreamMessagesVod.styles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';

interface StreamMessagesVodProps {
  data: STREAM_PROFILE_FRAGMENT;
}

const StreamMessagesVod: FC<StreamMessagesVodProps> = (props) => {
  const { data: { getStreamProfile } } = useGetStreamProfileQuery({
    variables: {
      id: props.data.id,
    },
  });


  /**
   * On init, get 20 messages from the current position
   */
  const [variables, setVariables] = useState<getStreamMessagesVodVariables>({
    id: props.data.id,
    from: getStreamProfile.position
      ? new Date((new Date(getStreamProfile.timeFrom).getTime() + getStreamProfile.position * 1000) - 10000).toISOString()
      : getStreamProfile.timeFrom,
    last: 20,
    before: null,
  });


  const cancelFetchMore = useRef(false);
  const fetchingMore = useRef(false);
  const noMoreToFetch = useRef(false);
  const currentPosition = useRef(getStreamProfile.position);


  /**
   * If the position changes by more than 1 second
   * The user has seeked the stream
   * Set the variables and reset refs
   */
  useEffect(() => {
    if (Math.abs(currentPosition.current - getStreamProfile.position) > 1) {
      /**
       * Set the variables to stop any mutations to the cache while the updates variables are requested
       * These will be reset at in the useEffect below
       */
      cancelFetchMore.current = true;
      fetchingMore.current = true;

      setVariables({
        id: props.data.id,
        from: getStreamProfile.position
          ? new Date((new Date(getStreamProfile.timeFrom).getTime() + getStreamProfile.position * 1000) - 10000).toISOString()
          : getStreamProfile.timeFrom,
        last: 20,
        before: null,
      });
    }
    currentPosition.current = getStreamProfile.position;
  }, [getStreamProfile.position]);


  /**
   * When variables change
   * Reset all values
   */
  useEffect(() => {
    cancelFetchMore.current = false;
    fetchingMore.current = false;
    noMoreToFetch.current = false;
  }, [variables]);


  const queryResult = useGetStreamMessagesVodQuery({
    variables,
  });


  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }


  if (!queryResult.data?.getStreamMessagesVod) {
    return <LoadRetry loading />;
  }


  /**
   * Get the current position date
   * Reduce the query results messages to get the ones that need to be displayed
   */
  const currentPositionTime = new Date(new Date(getStreamProfile.timeFrom).getTime() + getStreamProfile.position * 1000);
  const messagesToDisplay = queryResult.data.getStreamMessagesVod.messages.reduce((a, c) => {
    if (new Date(c.createdAt) <= currentPositionTime) {
      a.push(c);
    }
    return a;
  }, []);


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

      try {
        await queryResult.fetchMore({
          variables: {
            ...variables,
            before: queryResult.data.getStreamMessagesVod.messages[0].id,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            try {
              if (!fetchMoreResult || cancelFetchMore.current) return prev;

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
            } catch (e) {
              return prev;
            }
          },
        });

        fetchingMore.current = false;
      } catch (e) {
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <StreamMessageListItem
            data={item}
            channelData={props.data.channel}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StreamMessagesVod;
