/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: payForStream
// ====================================================

export interface payForStream_payForStream_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface payForStream_payForStream_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: payForStream_payForStream_channel_profileImage_url | null;
}

export interface payForStream_payForStream_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: payForStream_payForStream_channel_profileImage | null;
}

export interface payForStream_payForStream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface payForStream_payForStream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: payForStream_payForStream_image_url | null;
}

export interface payForStream_payForStream_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface payForStream_payForStream {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: payForStream_payForStream_channel | null;
  image: payForStream_payForStream_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  tags: (payForStream_payForStream_tags | null)[] | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
  cancelled: any | null;
}

export interface payForStream {
  payForStream: payForStream_payForStream;
}

export interface payForStreamVariables {
  id: string;
}
