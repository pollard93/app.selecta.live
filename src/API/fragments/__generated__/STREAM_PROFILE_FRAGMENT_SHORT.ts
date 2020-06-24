/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: STREAM_PROFILE_FRAGMENT_SHORT
// ====================================================

export interface STREAM_PROFILE_FRAGMENT_SHORT_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_PROFILE_FRAGMENT_SHORT_image_url | null;
}

export interface STREAM_PROFILE_FRAGMENT_SHORT {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: STREAM_PROFILE_FRAGMENT_SHORT_channel | null;
  image: STREAM_PROFILE_FRAGMENT_SHORT_image | null;
  timeFrom: any | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
}
