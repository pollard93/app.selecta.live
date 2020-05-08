/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CHANNEL_NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelNotifications
// ====================================================

export interface getChannelNotifications_getChannelNotifications_notifications {
  __typename: "ChannelNotification";
  id: string;
  type: CHANNEL_NOTIFICATION_TYPE | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface getChannelNotifications_getChannelNotifications {
  __typename: "ChannelNotificationsPayLoad";
  notifications: getChannelNotifications_getChannelNotifications_notifications[];
  count: number;
}

export interface getChannelNotifications {
  getChannelNotifications: getChannelNotifications_getChannelNotifications;
}

export interface getChannelNotificationsVariables {
  first?: number | null;
  after?: string | null;
}
