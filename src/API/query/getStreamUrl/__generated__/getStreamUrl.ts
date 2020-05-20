/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamUrl
// ====================================================

export interface getStreamUrl_getStreamUrl {
  __typename: "StreamUrlPayload";
  audio: string | null;
  video: string | null;
}

export interface getStreamUrl {
  getStreamUrl: getStreamUrl_getStreamUrl;
}

export interface getStreamUrlVariables {
  id: string;
}
