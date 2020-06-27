/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: USER_PROFILE_FRAGMENT
// ====================================================

export interface USER_PROFILE_FRAGMENT_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface USER_PROFILE_FRAGMENT_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: USER_PROFILE_FRAGMENT_profilePicture_url | null;
}

export interface USER_PROFILE_FRAGMENT {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: USER_PROFILE_FRAGMENT_profilePicture | null;
}
