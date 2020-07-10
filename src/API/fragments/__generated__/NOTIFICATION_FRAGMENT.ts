/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NOTIFICATION_TYPE } from "./../../../../__generated__/globalTypes";

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

export interface NOTIFICATION_FRAGMENT_channelReceiver {
  __typename: "ChannelProfile";
  id: string;
}

export interface NOTIFICATION_FRAGMENT {
  __typename: "Notification";
  id: string;
  type: NOTIFICATION_TYPE | null;
  sender: NOTIFICATION_FRAGMENT_sender | null;
  channelReceiver: NOTIFICATION_FRAGMENT_channelReceiver | null;
  readDate: any | null;
  createdAt: any | null;
}
