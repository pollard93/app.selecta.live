/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: STREAM_PROFILE_FRAGMENT
// ====================================================

export interface STREAM_PROFILE_FRAGMENT_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_PROFILE_FRAGMENT_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_PROFILE_FRAGMENT_image_url | null;
}

export interface STREAM_PROFILE_FRAGMENT_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface STREAM_PROFILE_FRAGMENT {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: STREAM_PROFILE_FRAGMENT_channel | null;
  image: STREAM_PROFILE_FRAGMENT_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  tags: (STREAM_PROFILE_FRAGMENT_tags | null)[] | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
  cancelled: any | null;
}
