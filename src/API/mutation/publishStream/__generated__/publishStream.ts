/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: publishStream
// ====================================================

export interface publishStream_publishStream {
  __typename: "StreamSelf";
  id: string;
  published: any | null;
}

export interface publishStream {
  publishStream: publishStream_publishStream | null;
}

export interface publishStreamVariables {
  id: string;
}
