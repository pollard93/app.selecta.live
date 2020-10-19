/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unlistStream
// ====================================================

export interface unlistStream_unlistStream {
  __typename: "StreamSelf";
  id: string;
  unlisted: any | null;
}

export interface unlistStream {
  unlistStream: unlistStream_unlistStream | null;
}

export interface unlistStreamVariables {
  id: string;
  list?: boolean | null;
}
