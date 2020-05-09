/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamSelf
// ====================================================

export interface getStreamSelf_getStreamSelf_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamSelf_getStreamSelf_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamSelf_getStreamSelf_image_url | null;
}

export interface getStreamSelf_getStreamSelf {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  image: getStreamSelf_getStreamSelf_image | null;
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
}

export interface getStreamSelf {
  getStreamSelf: getStreamSelf_getStreamSelf;
}

export interface getStreamSelfVariables {
  id: string;
}
