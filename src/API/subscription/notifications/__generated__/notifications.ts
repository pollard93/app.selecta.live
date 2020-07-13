/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType, NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: notifications
// ====================================================

export interface notifications_notifications_node_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface notifications_notifications_node_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: notifications_notifications_node_sender_profilePicture_url | null;
}

export interface notifications_notifications_node_sender {
  __typename: "UserProfile";
  id: string;
  profilePicture: notifications_notifications_node_sender_profilePicture | null;
}

export interface notifications_notifications_node_channelReceiver {
  __typename: "ChannelProfile";
  id: string;
}

export interface notifications_notifications_node {
  __typename: "Notification";
  id: string;
  type: NOTIFICATION_TYPE | null;
  sender: notifications_notifications_node_sender | null;
  channelReceiver: notifications_notifications_node_channelReceiver | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface notifications_notifications {
  __typename: "NotificationSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: notifications_notifications_node | null;
}

export interface notifications {
  notifications: notifications_notifications | null;
}
