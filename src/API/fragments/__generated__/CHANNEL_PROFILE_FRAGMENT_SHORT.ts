/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CHANNEL_PROFILE_FRAGMENT_SHORT
// ====================================================

export interface CHANNEL_PROFILE_FRAGMENT_SHORT_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface CHANNEL_PROFILE_FRAGMENT_SHORT_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CHANNEL_PROFILE_FRAGMENT_SHORT_profileImage_url | null;
}

export interface CHANNEL_PROFILE_FRAGMENT_SHORT {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: CHANNEL_PROFILE_FRAGMENT_SHORT_profileImage | null;
}
