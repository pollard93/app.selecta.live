/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NOTIFICATION_TYPE, NOTIFICATION_ON_OPEN_TYPE } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: NOTIFICATION_FRAGMENT
// ====================================================

export interface NOTIFICATION_FRAGMENT_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface NOTIFICATION_FRAGMENT_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: NOTIFICATION_FRAGMENT_sender_profilePicture_url | null;
}

export interface NOTIFICATION_FRAGMENT_sender {
  __typename: "UserProfile";
  id: string;
  profilePicture: NOTIFICATION_FRAGMENT_sender_profilePicture | null;
}

export interface NOTIFICATION_FRAGMENT_stream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface NOTIFICATION_FRAGMENT_stream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: NOTIFICATION_FRAGMENT_stream_image_url | null;
}

export interface NOTIFICATION_FRAGMENT_stream {
  __typename: "StreamProfile";
  id: string;
  image: NOTIFICATION_FRAGMENT_stream_image | null;
}

export interface NOTIFICATION_FRAGMENT_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface NOTIFICATION_FRAGMENT_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: NOTIFICATION_FRAGMENT_channel_profileImage_url | null;
}

export interface NOTIFICATION_FRAGMENT_channel {
  __typename: "ChannelProfile";
  id: string;
  profileImage: NOTIFICATION_FRAGMENT_channel_profileImage | null;
}

export interface NOTIFICATION_FRAGMENT {
  __typename: "NotificationProfile";
  id: string;
  type: NOTIFICATION_TYPE | null;
  message: string | null;
  onOpenType: NOTIFICATION_ON_OPEN_TYPE | null;
  sender: NOTIFICATION_FRAGMENT_sender | null;
  stream: NOTIFICATION_FRAGMENT_stream | null;
  channel: NOTIFICATION_FRAGMENT_channel | null;
  readDate: any | null;
  createdAt: any | null;
}
