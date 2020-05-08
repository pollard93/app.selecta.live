/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: readChannelNotification
// ====================================================

export interface readChannelNotification_readChannelNotification {
  __typename: "ChannelNotification";
  id: string;
  readDate: any | null;
}

export interface readChannelNotification {
  readChannelNotification: readChannelNotification_readChannelNotification;
}

export interface readChannelNotificationVariables {
  id: string;
  unRead?: boolean | null;
}
