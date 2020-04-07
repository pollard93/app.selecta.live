/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: payForStream
// ====================================================

export interface payForStream_payForStream_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface payForStream_payForStream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface payForStream_payForStream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: payForStream_payForStream_image_url | null;
}

export interface payForStream_payForStream {
  __typename: "StreamProfile";
  id: string;
  channel: payForStream_payForStream_channel | null;
  name: string | null;
  image: payForStream_payForStream_image | null;
  isConsumer: boolean | null;
}

export interface payForStream {
  payForStream: payForStream_payForStream;
}

export interface payForStreamVariables {
  id: string;
}
