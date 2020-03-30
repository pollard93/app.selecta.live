/* eslint-disable max-len */
import React from 'react';
import { View, Text } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_CONSUMER_NOTIFICATIONS_QUERY } from '../../../API/query/getConsumerNotifications/getConsumerNotifications';
import { getConsumerNotificationsVariables, getConsumerNotifications, getConsumerNotifications_getConsumerNotifications_notifications } from '../../../API/query/getConsumerNotifications/__generated__/getConsumerNotifications';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import styles from './ConsumerNotifications.styles';

class ConsumerNotificationsFlatList extends ApolloFlatList<getConsumerNotificationsVariables, getConsumerNotifications, getConsumerNotifications_getConsumerNotifications_notifications> {}

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
  />
);

export default ConsumerNotifications;
