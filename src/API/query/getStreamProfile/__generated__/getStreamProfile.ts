/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamProfile
// ====================================================

export interface getStreamProfile_getStreamProfile_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface getStreamProfile_getStreamProfile_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamProfile_getStreamProfile_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamProfile_getStreamProfile_image_url | null;
}

export interface getStreamProfile_getStreamProfile {
  __typename: "StreamProfile";
  id: string;
  channel: getStreamProfile_getStreamProfile_channel | null;
  name: string | null;
  image: getStreamProfile_getStreamProfile_image | null;
  isConsumer: boolean | null;
}

export interface getStreamProfile {
  getStreamProfile: getStreamProfile_getStreamProfile;
}

export interface getStreamProfileVariables {
  id: string;
}
