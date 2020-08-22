/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamProfile
// ====================================================

export interface getStreamProfile_getStreamProfile_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamProfile_getStreamProfile_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamProfile_getStreamProfile_channel_profileImage_url | null;
}

export interface getStreamProfile_getStreamProfile_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getStreamProfile_getStreamProfile_channel_profileImage | null;
}

export interface getStreamProfile_getStreamProfile_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamProfile_getStreamProfile_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamProfile_getStreamProfile_image_url | null;
}

export interface getStreamProfile_getStreamProfile_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getStreamProfile_getStreamProfile {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: getStreamProfile_getStreamProfile_channel | null;
  image: getStreamProfile_getStreamProfile_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  cancelled: any | null;
  tags: (getStreamProfile_getStreamProfile_tags | null)[] | null;
  info: string | null;
  cost: number | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
  cancelledMessage: string | null;
}

export interface getStreamProfile {
  getStreamProfile: getStreamProfile_getStreamProfile;
}

export interface getStreamProfileVariables {
  id: string;
}
