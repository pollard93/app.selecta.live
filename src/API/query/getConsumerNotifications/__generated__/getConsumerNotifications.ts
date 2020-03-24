/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getConsumerNotifications
// ====================================================

export interface getConsumerNotifications_getConsumerNotifications_notifications_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getConsumerNotifications_getConsumerNotifications_notifications_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getConsumerNotifications_getConsumerNotifications_notifications_sender_profilePicture_url | null;
}

export interface getConsumerNotifications_getConsumerNotifications_notifications_sender {
  __typename: "User";
  id: string;
  profilePicture: getConsumerNotifications_getConsumerNotifications_notifications_sender_profilePicture | null;
}

export interface getConsumerNotifications_getConsumerNotifications_notifications {
  __typename: "ConsumerNotification";
  id: string;
  type: NOTIFICATION_TYPE;
  sender: getConsumerNotifications_getConsumerNotifications_notifications_sender;
  readDate: any | null;
  createdAt: any;
}

export interface getConsumerNotifications_getConsumerNotifications {
  __typename: "ConsumerNotificationsPayLoad";
  notifications: getConsumerNotifications_getConsumerNotifications_notifications[];
  count: number;
}

export interface getConsumerNotifications {
  getConsumerNotifications: getConsumerNotifications_getConsumerNotifications;
}

export interface getConsumerNotificationsVariables {
  first?: number | null;
  after?: string | null;
}
