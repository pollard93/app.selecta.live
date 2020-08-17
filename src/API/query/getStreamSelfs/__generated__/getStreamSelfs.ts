/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getStreamSelfs
// ====================================================

export interface getStreamSelfs_getStreamSelfs_streams_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamSelfs_getStreamSelfs_streams_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamSelfs_getStreamSelfs_streams_channel_profileImage_url | null;
}

export interface getStreamSelfs_getStreamSelfs_streams_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getStreamSelfs_getStreamSelfs_streams_channel_profileImage | null;
}

export interface getStreamSelfs_getStreamSelfs_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamSelfs_getStreamSelfs_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamSelfs_getStreamSelfs_streams_image_url | null;
}

export interface getStreamSelfs_getStreamSelfs_streams_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getStreamSelfs_getStreamSelfs_streams {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  channel: getStreamSelfs_getStreamSelfs_streams_channel | null;
  image: getStreamSelfs_getStreamSelfs_streams_image | null;
  tags: (getStreamSelfs_getStreamSelfs_streams_tags | null)[] | null;
  timeFrom: any | null;
  timeTo: any | null;
  cost: number | null;
  cancelled: any | null;
  password: string | null;
  creditRevenuePending: number | null;
  creditRevenue: number | null;
  consumersEdge: number | null;
  liveConsumersEdge: number | null;
  streamKey: string | null;
  streamUrl: string | null;
  audioOnly: boolean | null;
  published: any | null;
  viewCount: number | null;
  position: number | null;
}

export interface getStreamSelfs_getStreamSelfs {
  __typename: "StreamSelfsPayLoad";
  streams: getStreamSelfs_getStreamSelfs_streams[];
  count: number;
}

export interface getStreamSelfs {
  getStreamSelfs: getStreamSelfs_getStreamSelfs;
}

export interface getStreamSelfsVariables {
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
