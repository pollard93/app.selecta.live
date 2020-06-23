/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: putStream
// ====================================================

export interface putStream_putStream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface putStream_putStream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: putStream_putStream_image_url | null;
}

export interface putStream_putStream {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  image: putStream_putStream_image | null;
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
}
