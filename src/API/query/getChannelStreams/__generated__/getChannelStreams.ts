/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChannelStreams
// ====================================================

export interface getChannelStreams_getChannelStreams_streams_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface getChannelStreams_getChannelStreams_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelStreams_getChannelStreams_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelStreams_getChannelStreams_streams_image_url | null;
}

export interface getChannelStreams_getChannelStreams_streams {
  __typename: "StreamProfile";
  id: string;
  channel: getChannelStreams_getChannelStreams_streams_channel | null;
  name: string | null;
  image: getChannelStreams_getChannelStreams_streams_image | null;
  isConsumer: boolean | null;
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
  first?: number | null;
  after?: string | null;
}
