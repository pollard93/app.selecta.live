/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: STREAM_PROFILE_FRAGMENT_SHORT
// ====================================================

export interface STREAM_PROFILE_FRAGMENT_SHORT_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_PROFILE_FRAGMENT_SHORT_channel_profileImage_url | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: STREAM_PROFILE_FRAGMENT_SHORT_channel_profileImage | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_PROFILE_FRAGMENT_SHORT_image_url | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: STREAM_PROFILE_FRAGMENT_SHORT_channel | null;
  image: STREAM_PROFILE_FRAGMENT_SHORT_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  cancelled: any | null;
  tags: (STREAM_PROFILE_FRAGMENT_SHORT_tags | null)[] | null;
  position: number | null;
}
