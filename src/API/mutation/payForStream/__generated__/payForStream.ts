/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: payForStream
// ====================================================

export interface payForStream_payForStream {
  __typename: "StreamProfile";
  id: string;
  isConsumer: boolean | null;
}

export interface payForStream {
  payForStream: payForStream_payForStream;
}

export interface payForStreamVariables {
  id: string;
}
