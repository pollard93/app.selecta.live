/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateStream
// ====================================================

export interface updateStream_updateStream_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface updateStream_updateStream_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: updateStream_updateStream_image_url | null;
}

export interface updateStream_updateStream_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface updateStream_updateStream {
  __typename: "StreamSelf";
  id: string;
  name: string | null;
  info: string | null;
  image: updateStream_updateStream_image | null;
  tags: (updateStream_updateStream_tags | null)[] | null;
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
}

export interface updateStream {
  updateStream: updateStream_updateStream | null;
}

export interface updateStreamVariables {
  id: string;
  name?: string | null;
  info?: string | null;
  timeFrom?: any | null;
  timeTo?: any | null;
  cost?: number | null;
  image?: any | null;
  audioOnly?: boolean | null;
  tags?: string[] | null;
}
