/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamSelfLive
// ====================================================

export interface getStreamSelfLive_getStreamSelf {
  __typename: "StreamSelf";
  id: string;
  liveConsumersEdge: number | null;
}

export interface getStreamSelfLive {
  getStreamSelf: getStreamSelfLive_getStreamSelf;
}

export interface getStreamSelfLiveVariables {
  id: string;
}
