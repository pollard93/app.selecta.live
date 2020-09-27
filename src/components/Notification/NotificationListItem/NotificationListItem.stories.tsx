import React from 'react';
import { storiesOf } from '@storybook/react-native';
import SafeAreaViewDecorator from '../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import NotificationListItem from './NotificationListItem';
import { useGetNotificationsQuery } from '../../../API/query/getNotifications/getNotifications';
import NotificationListItemSkeleton from './NotificationListItemSkeleton';

storiesOf('Notifications/NotificationListItem', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator>{getStory()}</SafeAreaViewDecorator>)
  .add('NotificationListItem - read', () => {
    const TestComponent = () => {
      const notifications = useGetNotificationsQuery();
      if (notifications.loading) return null;
      return (
        <NotificationListItem
          data={{
            ...notifications.data.getNotifications.notifications[0],
          }}
        />
      );
    };

    return (
      <TestComponent />
    );
  })
  .add('NotificationListItem - not read', () => {
    const TestComponent = () => {
      const notifications = useGetNotificationsQuery();
      if (notifications.loading) return null;
      return (
        <NotificationListItem
          data={{
            ...notifications.data.getNotifications.notifications[0],
            readDate: null,
          }}
        />
      );
    };

    return (
      <TestComponent />
    );
  })
  .add('NotificationListItem - no image', () => {
    const TestComponent = () => {
      const notifications = useGetNotificationsQuery();
      if (notifications.loading) return null;
      return (
        <NotificationListItem
          data={{
            ...notifications.data.getNotifications.notifications[0],
            onOpenType: null,
          }}
        />
      );
    };

    return (
      <TestComponent />
    );
  })
  .add('NotificationListItem - bold text', () => {
    const TestComponent = () => {
      const notifications = useGetNotificationsQuery();
      if (notifications.loading) return null;
      return (
        <NotificationListItem
          data={{
            ...notifications.data.getNotifications.notifications[0],
            message: 'Hello this text is **BOLD**',
            readDate: null,
          }}
        />
      );
    };

    return (
      <TestComponent />
    );
  })
  .add('NotificationListItemSkeleton', () => (
    <NotificationListItemSkeleton />
  ));
