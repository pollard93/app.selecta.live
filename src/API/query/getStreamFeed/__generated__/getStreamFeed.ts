/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamFeed
// ====================================================

export interface getStreamFeed_getStreamFeed_streams_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface getStreamFeed_getStreamFeed_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamFeed_getStreamFeed_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamFeed_getStreamFeed_streams_image_url | null;
}

export interface getStreamFeed_getStreamFeed_streams {
  __typename: "StreamProfile";
  id: string;
  channel: getStreamFeed_getStreamFeed_streams_channel | null;
  name: string | null;
  image: getStreamFeed_getStreamFeed_streams_image | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
}

export interface getStreamFeed_getStreamFeed {
  __typename: "StreamProfilesPayLoad";
  streams: getStreamFeed_getStreamFeed_streams[];
  count: number;
}

export interface getStreamFeed {
  getStreamFeed: getStreamFeed_getStreamFeed;
}

export interface getStreamFeedVariables {
  first?: number | null;
  after?: string | null;
}
