/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: USER_SELF_FRAGMENT
// ====================================================

export interface USER_SELF_FRAGMENT_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface USER_SELF_FRAGMENT_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: USER_SELF_FRAGMENT_profilePicture_url | null;
}

export interface USER_SELF_FRAGMENT_requiresUpdate {
  __typename: "AppUpdatePayload";
  appStoreUrl: string | null;
  playStoreUrl: string | null;
}

export interface USER_SELF_FRAGMENT {
  __typename: "UserSelf";
  id: string;
  name: string | null;
  email: string | null;
  profilePicture: USER_SELF_FRAGMENT_profilePicture | null;
  unreadNotificationCount: number | null;
  requiresUpdate: USER_SELF_FRAGMENT_requiresUpdate | null;
}
