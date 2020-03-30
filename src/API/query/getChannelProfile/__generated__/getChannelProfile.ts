/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChannelProfile
// ====================================================

export interface getChannelProfile_getChannelProfile_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelProfile_getChannelProfile_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelProfile_getChannelProfile_profileImage_url | null;
}

export interface getChannelProfile_getChannelProfile {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getChannelProfile_getChannelProfile_profileImage | null;
  following: boolean | null;
  followersEdge: number | null;
}

export interface getChannelProfile {
  getChannelProfile: getChannelProfile_getChannelProfile;
}

export interface getChannelProfileVariables {
  id: string;
}
