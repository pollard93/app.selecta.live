/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CHANNEL_PROFILE_FRAGMENT
// ====================================================

export interface CHANNEL_PROFILE_FRAGMENT_coverImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface CHANNEL_PROFILE_FRAGMENT_coverImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CHANNEL_PROFILE_FRAGMENT_coverImage_url | null;
}

export interface CHANNEL_PROFILE_FRAGMENT_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface CHANNEL_PROFILE_FRAGMENT_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CHANNEL_PROFILE_FRAGMENT_profileImage_url | null;
}

export interface CHANNEL_PROFILE_FRAGMENT {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  coverImage: CHANNEL_PROFILE_FRAGMENT_coverImage | null;
  profileImage: CHANNEL_PROFILE_FRAGMENT_profileImage | null;
  following: boolean | null;
  followersEdge: number | null;
}
