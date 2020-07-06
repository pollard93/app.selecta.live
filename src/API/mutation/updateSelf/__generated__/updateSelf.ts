/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSelf
// ====================================================

export interface updateSelf_updateSelf_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface updateSelf_updateSelf_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: updateSelf_updateSelf_profilePicture_url | null;
}

export interface updateSelf_updateSelf_requiresUpdate {
  __typename: "AppUpdatePayload";
  appStoreUrl: string | null;
  playStoreUrl: string | null;
}

export interface updateSelf_updateSelf {
  __typename: "UserSelf";
  id: string;
  username: string | null;
  email: string | null;
  credit: number | null;
  profilePicture: updateSelf_updateSelf_profilePicture | null;
  unreadNotificationCount: number | null;
  requiresUpdate: updateSelf_updateSelf_requiresUpdate | null;
}

export interface updateSelf {
  updateSelf: updateSelf_updateSelf | null;
}

export interface updateSelfVariables {
  username?: string | null;
  profilePicture?: any | null;
}
