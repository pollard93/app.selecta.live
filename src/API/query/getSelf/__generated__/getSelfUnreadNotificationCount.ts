/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSelfUnreadNotificationCount
// ====================================================

export interface getSelfUnreadNotificationCount_getSelf {
  __typename: "UserSelf";
  id: string;
  unreadNotificationCount: number | null;
}

export interface getSelfUnreadNotificationCount {
  getSelf: getSelfUnreadNotificationCount_getSelf | null;
}
