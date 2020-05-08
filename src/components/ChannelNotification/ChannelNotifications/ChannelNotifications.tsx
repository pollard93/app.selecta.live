/* eslint-disable max-len */
import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CHANNEL_NOTIFICATIONS_QUERY } from '../../../API/query/getChannelNotifications/getChannelNotifications';
import { getChannelNotificationsVariables, getChannelNotifications, getChannelNotifications_getChannelNotifications_notifications } from '../../../API/query/getChannelNotifications/__generated__/getChannelNotifications';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import ChannelNotificationListItem from '../ChannelNotificationListItem/ChannelNotificationListItem';
import styles from './ChannelNotifications.styles';
import { CHANNEL_NOTIFICATIONS_SUBSCRIPTION } from '../../../API/subscription/channelNotifications/channelNotifications';
import { channelNotifications } from '../../../API/subscription/channelNotifications/__generated__/channelNotifications';

class ChannelNotificationsFlatList extends ApolloFlatList<getChannelNotificationsVariables, getChannelNotifications, getChannelNotifications_getChannelNotifications_notifications, null, channelNotifications> {}

const ChannelNotifications = () => (
  <ChannelNotificationsFlatList
    query={GET_CHANNEL_NOTIFICATIONS_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getChannelNotifications.notifications'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <ChannelNotificationListItem data={item} />
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
      document: CHANNEL_NOTIFICATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        // Only want to insert created nodes
        if (subscriptionData.data.channelNotifications.mutation !== 'CREATED') return prev;

        try {
          return {
            ...prev,
            getChannelNotifications: {
              ...prev.getChannelNotifications,
              notifications: [subscriptionData.data.channelNotifications.node, ...prev.getChannelNotifications.notifications],
              count: prev.getChannelNotifications.count + 1,
            },
          };
        } catch (e) {
          return prev;
        }
      },
    }}
  />
);

export default ChannelNotifications;
