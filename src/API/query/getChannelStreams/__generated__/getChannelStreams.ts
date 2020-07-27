/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelStreams
// ====================================================

export interface getChannelStreams_getChannelStreams_streams_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelStreams_getChannelStreams_streams_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelStreams_getChannelStreams_streams_channel_profileImage_url | null;
}

export interface getChannelStreams_getChannelStreams_streams_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getChannelStreams_getChannelStreams_streams_channel_profileImage | null;
}

export interface getChannelStreams_getChannelStreams_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelStreams_getChannelStreams_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelStreams_getChannelStreams_streams_image_url | null;
}

export interface getChannelStreams_getChannelStreams_streams_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getChannelStreams_getChannelStreams_streams {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: getChannelStreams_getChannelStreams_streams_channel | null;
  image: getChannelStreams_getChannelStreams_streams_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  tags: (getChannelStreams_getChannelStreams_streams_tags | null)[] | null;
  info: string | null;
  cost: number | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
  cancelled: any | null;
}

export interface getChannelStreams_getChannelStreams {
  __typename: "StreamProfilesPayLoad";
  streams: getChannelStreams_getChannelStreams_streams[];
  count: number;
}

export interface getChannelStreams {
  getChannelStreams: getChannelStreams_getChannelStreams;
}

export interface getChannelStreamsVariables {
  id: string;
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
