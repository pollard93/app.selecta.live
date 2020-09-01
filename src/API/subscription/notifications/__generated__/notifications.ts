/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType, NOTIFICATION_TYPE, NOTIFICATION_ON_OPEN_TYPE } from "./../../../../../__generated__/globalTypes";

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

export interface notifications_notifications_node_stream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface notifications_notifications_node_stream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: notifications_notifications_node_stream_image_url | null;
}

export interface notifications_notifications_node_stream {
  __typename: "StreamProfile";
  id: string;
  image: notifications_notifications_node_stream_image | null;
}

export interface notifications_notifications_node_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface notifications_notifications_node_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: notifications_notifications_node_channel_profileImage_url | null;
}

export interface notifications_notifications_node_channel {
  __typename: "ChannelProfile";
  id: string;
  profileImage: notifications_notifications_node_channel_profileImage | null;
}

export interface notifications_notifications_node {
  __typename: "NotificationProfile";
  id: string;
  type: NOTIFICATION_TYPE | null;
  message: string | null;
  onOpenType: NOTIFICATION_ON_OPEN_TYPE | null;
  sender: notifications_notifications_node_sender | null;
  stream: notifications_notifications_node_stream | null;
  channel: notifications_notifications_node_channel | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface notifications_notifications {
  __typename: "NotificationProfileSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: notifications_notifications_node | null;
}

export interface notifications {
  notifications: notifications_notifications | null;
}
