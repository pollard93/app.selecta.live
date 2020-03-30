/* eslint-disable max-len */
import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CONSUMER_NOTIFICATIONS_QUERY } from '../../../API/query/getConsumerNotifications/getConsumerNotifications';
import { getConsumerNotificationsVariables, getConsumerNotifications, getConsumerNotifications_getConsumerNotifications_notifications } from '../../../API/query/getConsumerNotifications/__generated__/getConsumerNotifications';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import styles from './ConsumerNotifications.styles';
import { CONSUMER_NOTIFICATIONS_SUBSCRIPTION } from '../../../API/subscription/consumerNotifications/consumerNotifications';
import { consumerNotifications } from '../../../API/subscription/consumerNotifications/__generated__/consumerNotifications';

class ConsumerNotificationsFlatList extends ApolloFlatList<getConsumerNotificationsVariables, getConsumerNotifications, getConsumerNotifications_getConsumerNotifications_notifications, null, consumerNotifications> {}

const ConsumerNotifications = () => (
  <ConsumerNotificationsFlatList
    query={GET_CONSUMER_NOTIFICATIONS_QUERY}
    variables={{
      first: 5,
    }}
    accessor='getConsumerNotifications.notifications'
    renderItem={({ item }) => (
      <View style={styles.item}>
        <NotificationListItem data={item} />
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
      document: CONSUMER_NOTIFICATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        // Only want to insert created nodes
        if (subscriptionData.data.consumerNotifications.mutation !== 'CREATED') return prev;

        try {
          return {
            ...prev,
            getConsumerNotifications: {
              ...prev.getConsumerNotifications,
              notifications: [subscriptionData.data.consumerNotifications.node, ...prev.getConsumerNotifications.notifications],
              count: prev.getConsumerNotifications.count + 1,
            },
          };
        } catch (e) {
          return prev;
        }
      },
    }}
  />
);

export default ConsumerNotifications;
