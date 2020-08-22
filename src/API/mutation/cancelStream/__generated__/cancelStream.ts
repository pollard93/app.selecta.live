/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancelStream
// ====================================================

export interface cancelStream_cancelStream {
  __typename: "StreamSelf";
  id: string;
  cancelled: any | null;
  cancelledMessage: string | null;
}

export interface cancelStream {
  cancelStream: cancelStream_cancelStream | null;
}

export interface cancelStreamVariables {
  id: string;
  message: string;
}
