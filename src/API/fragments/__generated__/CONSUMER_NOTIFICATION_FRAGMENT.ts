/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NOTIFICATION_TYPE } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: CONSUMER_NOTIFICATION_FRAGMENT
// ====================================================

export interface CONSUMER_NOTIFICATION_FRAGMENT_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface CONSUMER_NOTIFICATION_FRAGMENT_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CONSUMER_NOTIFICATION_FRAGMENT_sender_profilePicture_url | null;
}

export interface CONSUMER_NOTIFICATION_FRAGMENT_sender {
  __typename: "User";
  id: string;
  profilePicture: CONSUMER_NOTIFICATION_FRAGMENT_sender_profilePicture | null;
}

export interface CONSUMER_NOTIFICATION_FRAGMENT {
  __typename: "ConsumerNotification";
  id: string;
  type: NOTIFICATION_TYPE;
  sender: CONSUMER_NOTIFICATION_FRAGMENT_sender;
  readDate: any | null;
  createdAt: any;
}
