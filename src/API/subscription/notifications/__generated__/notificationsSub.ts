/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType, NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: notificationsSub
// ====================================================

export interface notificationsSub_notifications_node_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface notificationsSub_notifications_node_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: notificationsSub_notifications_node_sender_profilePicture_url | null;
}

export interface notificationsSub_notifications_node_sender {
  __typename: "UserProfile";
  id: string;
  profilePicture: notificationsSub_notifications_node_sender_profilePicture | null;
}

export interface notificationsSub_notifications_node {
  __typename: "Notification";
  id: string;
  type: NOTIFICATION_TYPE | null;
  sender: notificationsSub_notifications_node_sender | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface notificationsSub_notifications {
  __typename: "NotificationSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: notificationsSub_notifications_node | null;
}

export interface notificationsSub {
  notifications: notificationsSub_notifications | null;
}
