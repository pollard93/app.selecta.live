/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: STREAM_SELF_FRAGMENT
// ====================================================

export interface STREAM_SELF_FRAGMENT_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_SELF_FRAGMENT_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_SELF_FRAGMENT_channel_profileImage_url | null;
}

export interface STREAM_SELF_FRAGMENT_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: STREAM_SELF_FRAGMENT_channel_profileImage | null;
}

export interface STREAM_SELF_FRAGMENT_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface STREAM_SELF_FRAGMENT_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: STREAM_SELF_FRAGMENT_image_url | null;
}

export interface STREAM_SELF_FRAGMENT_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface STREAM_SELF_FRAGMENT {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  channel: STREAM_SELF_FRAGMENT_channel | null;
  image: STREAM_SELF_FRAGMENT_image | null;
  tags: (STREAM_SELF_FRAGMENT_tags | null)[] | null;
  timeFrom: any | null;
  timeFromLive: any | null;
  timeTo: any | null;
  timeToLive: any | null;
  cost: number | null;
  cancelled: any | null;
  cancelledMessage: string | null;
  password: string | null;
  creditRevenuePending: number | null;
  creditRevenue: number | null;
  consumersEdge: number | null;
  liveConsumersEdge: number | null;
  commentsEdge: number | null;
  streamKey: string | null;
  streamUrl: string | null;
  audioOnly: boolean | null;
  published: any | null;
  viewCount: number | null;
  position: number | null;
}
