/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: STREAM_MESSAGE_FRAGMENT
// ====================================================

export interface STREAM_MESSAGE_FRAGMENT_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_MESSAGE_FRAGMENT_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_MESSAGE_FRAGMENT_user_profilePicture_url | null;
}

export interface STREAM_MESSAGE_FRAGMENT_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: STREAM_MESSAGE_FRAGMENT_user_profilePicture | null;
}

export interface STREAM_MESSAGE_FRAGMENT {
  __typename: "StreamMessageClient";
  id: string;
  user: STREAM_MESSAGE_FRAGMENT_user | null;
  message: string | null;
  createdAt: any | null;
}
