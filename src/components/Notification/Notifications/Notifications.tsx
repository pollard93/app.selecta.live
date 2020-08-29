/* eslint-disable max-len */
import React, { FC, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BadgeAndroid from 'react-native-android-badge';
import { GET_NOTIFICATIONS_QUERY } from '../../../API/query/getNotifications/getNotifications';
import { getNotificationsVariables, getNotifications, getNotifications_getNotifications_notifications } from '../../../API/query/getNotifications/__generated__/getNotifications';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import { NOTIFICATIONS_SUBSCRIPTION } from '../../../API/subscription/notifications/notifications';
import { notifications } from '../../../API/subscription/notifications/__generated__/notifications';
import Button from '../../UI/Button/Button';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

class NotificationsFlatList extends ApolloFlatList<getNotificationsVariables, getNotifications, getNotifications_getNotifications_notifications, null, notifications> {}

export interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = () => {
  const screenProps = useScreenProps();


  /**
   * Clear badges
   */
  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
      return;
    }

    if (Platform.OS === 'android') {
      BadgeAndroid.setBadge(0);
    }
  }, []);


  /**
   * On Dismiss
   */
  const onDismiss = () => {
    Navigation.dismissModal(screenProps.componentId);
  };


  return (
    <View>
      <Button
        title="Close modal"
        onPress={onDismiss}
      />

      <NotificationsFlatList
        query={GET_NOTIFICATIONS_QUERY}
        fetchPolicy={'network-only'}
        variables={{
          first: 5,
        }}
        accessor='getNotifications.notifications'
        renderItem={({ item }) => (
          <NotificationListItem data={item} />
        )}
        // LoadingErrorComponent={(queryResult) => <LoadRetry {...queryResult} />}
        ListHeaderComponent={() => (
          <Text>HEADER</Text>
        )}
        ListFooterComponent={({ moreToLoad }) => (
          <Text>{moreToLoad ? 'LOADING' : 'NO MORE TO LOAD'}</Text>
        )}
        subscriptionOptions={{
          document: NOTIFICATIONS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            // Only want to insert created nodes
            if (subscriptionData.data.notifications.mutation !== 'CREATED') return prev;

            try {
              return {
                ...prev,
                getNotifications: {
                  ...prev.getNotifications,
                  notifications: [subscriptionData.data.notifications.node, ...prev.getNotifications.notifications],
                  count: prev.getNotifications.count + 1,
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
    </View>
  );
};

export default Notifications;
