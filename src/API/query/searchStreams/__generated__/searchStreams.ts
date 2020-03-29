/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamOrderByInput, StreamWhereInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchStreams
// ====================================================

export interface searchStreams_searchStreams_streams_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface searchStreams_searchStreams_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface searchStreams_searchStreams_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: searchStreams_searchStreams_streams_image_url | null;
}

export interface searchStreams_searchStreams_streams {
  __typename: "StreamProfile";
  id: string;
  channel: searchStreams_searchStreams_streams_channel | null;
  name: string | null;
  image: searchStreams_searchStreams_streams_image | null;
  isConsumer: boolean | null;
}

export interface searchStreams_searchStreams {
  __typename: "StreamProfilesPayLoad";
  streams: searchStreams_searchStreams_streams[];
  count: number;
}

export interface searchStreams {
  searchStreams: searchStreams_searchStreams;
}

export interface searchStreamsVariables {
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
