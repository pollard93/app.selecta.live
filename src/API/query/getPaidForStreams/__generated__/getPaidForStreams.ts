/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getPaidForStreams
// ====================================================

export interface getPaidForStreams_getPaidForStreams_streams_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface getPaidForStreams_getPaidForStreams_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getPaidForStreams_getPaidForStreams_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getPaidForStreams_getPaidForStreams_streams_image_url | null;
}

export interface getPaidForStreams_getPaidForStreams_streams {
  __typename: "StreamProfile";
  id: string;
  channel: getPaidForStreams_getPaidForStreams_streams_channel | null;
  name: string | null;
  image: getPaidForStreams_getPaidForStreams_streams_image | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
}

export interface getPaidForStreams_getPaidForStreams {
  __typename: "StreamProfilesPayLoad";
  streams: getPaidForStreams_getPaidForStreams_streams[];
  count: number;
}

export interface getPaidForStreams {
  getPaidForStreams: getPaidForStreams_getPaidForStreams;
}

export interface getPaidForStreamsVariables {
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
