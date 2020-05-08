/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType, CHANNEL_NOTIFICATION_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: channelNotifications
// ====================================================

export interface channelNotifications_channelNotifications_node {
  __typename: "ChannelNotification";
  id: string;
  type: CHANNEL_NOTIFICATION_TYPE | null;
  readDate: any | null;
  createdAt: any | null;
}

export interface channelNotifications_channelNotifications {
  __typename: "ChannelNotificationSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: channelNotifications_channelNotifications_node | null;
}

export interface channelNotifications {
  channelNotifications: channelNotifications_channelNotifications | null;
}
