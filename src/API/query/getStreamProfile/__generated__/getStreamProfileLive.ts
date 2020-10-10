/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamProfileLive
// ====================================================

export interface getStreamProfileLive_getStreamProfile {
  __typename: "StreamProfile";
  id: string;
  timeFromLive: any | null;
  timeToLive: any | null;
  liveConsumersEdge: number | null;
}

export interface getStreamProfileLive {
  getStreamProfile: getStreamProfileLive_getStreamProfile;
}

export interface getStreamProfileLiveVariables {
  id: string;
}
