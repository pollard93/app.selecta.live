/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType, NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: consumerNotifications
// ====================================================

export interface consumerNotifications_consumerNotifications_node_sender_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface consumerNotifications_consumerNotifications_node_sender_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: consumerNotifications_consumerNotifications_node_sender_profilePicture_url | null;
}

export interface consumerNotifications_consumerNotifications_node_sender {
  __typename: "User";
  id: string;
  profilePicture: consumerNotifications_consumerNotifications_node_sender_profilePicture | null;
}

export interface consumerNotifications_consumerNotifications_node {
  __typename: "ConsumerNotification";
  id: string;
  type: NOTIFICATION_TYPE;
  sender: consumerNotifications_consumerNotifications_node_sender;
  readDate: any | null;
  createdAt: any;
}

export interface consumerNotifications_consumerNotifications {
  __typename: "ConsumerNotificationSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: consumerNotifications_consumerNotifications_node | null;
}

export interface consumerNotifications {
  consumerNotifications: consumerNotifications_consumerNotifications | null;
}
