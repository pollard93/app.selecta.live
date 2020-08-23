/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: readNotification
// ====================================================

export interface readNotification_readNotification {
  __typename: "NotificationProfile";
  id: string;
  readDate: any | null;
}

export interface readNotification {
  readNotification: readNotification_readNotification;
}

export interface readNotificationVariables {
  id: string;
  unRead?: boolean | null;
}
