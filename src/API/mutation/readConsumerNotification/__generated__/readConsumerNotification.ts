/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: readConsumerNotification
// ====================================================

export interface readConsumerNotification_readConsumerNotification {
  __typename: "ConsumerNotification";
  id: string;
  readDate: any | null;
}

export interface readConsumerNotification {
  readConsumerNotification: readConsumerNotification_readConsumerNotification;
}

export interface readConsumerNotificationVariables {
  id: string;
  unRead?: boolean | null;
}
