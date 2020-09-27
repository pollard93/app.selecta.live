/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: purchaseStream
// ====================================================

export interface purchaseStream_purchaseStream {
  __typename: "StreamProfile";
  id: string;
  isConsumer: boolean | null;
}

export interface purchaseStream {
  purchaseStream: purchaseStream_purchaseStream;
}

export interface purchaseStreamVariables {
  id: string;
}
