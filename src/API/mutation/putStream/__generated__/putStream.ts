/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: putStream
// ====================================================

export interface putStream_putStream_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface putStream_putStream_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: putStream_putStream_channel_profileImage_url | null;
}

export interface putStream_putStream_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: putStream_putStream_channel_profileImage | null;
}

export interface putStream_putStream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface putStream_putStream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: putStream_putStream_image_url | null;
}

export interface putStream_putStream_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface putStream_putStream {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  channel: putStream_putStream_channel | null;
  image: putStream_putStream_image | null;
  tags: (putStream_putStream_tags | null)[] | null;
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

export interface putStream {
  putStream: putStream_putStream | null;
}

export interface putStreamVariables {
  name: string;
  info: string;
  timeFrom: any;
  timeTo: any;
  cost: number;
  image?: any | null;
  audioOnly?: boolean | null;
  tags?: string[] | null;
}
