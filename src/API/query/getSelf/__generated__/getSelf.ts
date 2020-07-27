/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSelf
// ====================================================

export interface getSelf_getSelf_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getSelf_getSelf_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getSelf_getSelf_profilePicture_url | null;
}

export interface getSelf_getSelf_requiresUpdate {
  __typename: "AppUpdatePayload";
  appStoreUrl: string | null;
  playStoreUrl: string | null;
}

export interface getSelf_getSelf {
  __typename: "UserSelf";
  id: string;
  username: string | null;
  email: string | null;
  credit: number | null;
  profilePicture: getSelf_getSelf_profilePicture | null;
  unreadNotificationCount: number | null;
  isProducer: boolean | null;
  requiresUpdate: getSelf_getSelf_requiresUpdate | null;
  createdAt: any | null;
}

export interface getSelf {
  getSelf: getSelf_getSelf | null;
}
