/* eslint-disable max-len */
import React, { FC, useEffect } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { Navigation } from 'react-native-navigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BadgeAndroid from 'react-native-android-badge';
import { useDynamicValue } from 'react-native-dynamic';
import { GET_NOTIFICATIONS_QUERY } from '../../../API/query/getNotifications/getNotifications';
import { getNotificationsVariables, getNotifications, getNotifications_getNotifications_notifications } from '../../../API/query/getNotifications/__generated__/getNotifications';
import NotificationListItem from '../NotificationListItem/NotificationListItem';
import { NOTIFICATIONS_SUBSCRIPTION } from '../../../API/subscription/notifications/notifications';
import { notifications } from '../../../API/subscription/notifications/__generated__/notifications';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import Header, { useHeaderStyles } from '../../UI/Headers/Header/Header';
import Styles, { DynamicStyles } from './Notifications.styles';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import NotificationListItemSkeleton from '../NotificationListItem/NotificationListItemSkeleton';

class NotificationsFlatList extends ApolloFlatList<getNotificationsVariables, getNotifications, getNotifications_getNotifications_notifications, null, notifications> {}

export interface NotificationsProps {}

const Notifications: FC<NotificationsProps> = () => {
  const screenProps = useScreenProps();
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const { headerHeight } = useHeaderStyles();


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
   * On pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPop={onPop} />

      <NotificationsFlatList
        query={GET_NOTIFICATIONS_QUERY}
        fetchPolicy={'network-only'}
        variables={{
          first: 10,
        }}
        accessor='getNotifications.notifications'
        renderItem={({ item }) => (
          <NotificationListItem data={item} />
        )}
        ListHeaderComponent={({ queryResult }) => {
          if (queryResult.loading) {
            return (
              <View>
                <NotificationListItemSkeleton />
                <View style={[Styles.separator, dynamicStyles.separator]} />
                <NotificationListItemSkeleton />
                <View style={[Styles.separator, dynamicStyles.separator]} />
                <NotificationListItemSkeleton />
              </View>
            );
          }

          return null;
        }}
        FlatListProps={{
          ItemSeparatorComponent: () => <View style={[Styles.separator, dynamicStyles.separator]} />,
        }}
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
      >
        {({ queryResult }) => {
          if (queryResult.error) {
            return (
              <View style={[StyleSheet.absoluteFillObject, { paddingTop: headerHeight }]}>
                <LoadRetry {...queryResult} />
              </View>
            );
          }

          return null;
        }}
      </NotificationsFlatList>
    </View>
  );
};

export default Notifications;
