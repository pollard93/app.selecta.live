/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getNotifications
// ====================================================

export interface getNotifications_getNotifications_notifications_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getNotifications_getNotifications_notifications_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getNotifications_getNotifications_notifications_sender_profilePicture_url | null;
}

export interface getNotifications_getNotifications_notifications_sender {
  __typename: "UserProfile";
  id: string;
  profilePicture: getNotifications_getNotifications_notifications_sender_profilePicture | null;
}

export interface getNotifications_getNotifications_notifications_stream {
  __typename: "StreamProfile";
  id: string;
}

export interface getNotifications_getNotifications_notifications_channel {
  __typename: "ChannelProfile";
  id: string;
}

export interface getNotifications_getNotifications_notifications {
  __typename: "NotificationProfile";
  id: string;
  type: NOTIFICATION_TYPE | null;
  sender: getNotifications_getNotifications_notifications_sender | null;
  stream: getNotifications_getNotifications_notifications_stream | null;
  channel: getNotifications_getNotifications_notifications_channel | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface getNotifications_getNotifications {
  __typename: "NotificationProfilesPayLoad";
  notifications: getNotifications_getNotifications_notifications[];
  count: number;
}

export interface getNotifications {
  getNotifications: getNotifications_getNotifications;
}

export interface getNotificationsVariables {
  first?: number | null;
  after?: string | null;
}
