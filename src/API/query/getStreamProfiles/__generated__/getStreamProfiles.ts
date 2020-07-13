/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getStreamProfiles
// ====================================================

export interface getStreamProfiles_getStreamProfiles_streams_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamProfiles_getStreamProfiles_streams_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamProfiles_getStreamProfiles_streams_channel_profileImage_url | null;
}

export interface getStreamProfiles_getStreamProfiles_streams_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getStreamProfiles_getStreamProfiles_streams_channel_profileImage | null;
}

export interface getStreamProfiles_getStreamProfiles_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamProfiles_getStreamProfiles_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamProfiles_getStreamProfiles_streams_image_url | null;
}

export interface getStreamProfiles_getStreamProfiles_streams_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getStreamProfiles_getStreamProfiles_streams {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: getStreamProfiles_getStreamProfiles_streams_channel | null;
  image: getStreamProfiles_getStreamProfiles_streams_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  tags: (getStreamProfiles_getStreamProfiles_streams_tags | null)[] | null;
}

export interface getStreamProfiles_getStreamProfiles {
  __typename: "StreamProfilesPayLoad";
  streams: getStreamProfiles_getStreamProfiles_streams[];
  count: number;
}

export interface getStreamProfiles {
  getStreamProfiles: getStreamProfiles_getStreamProfiles;
}

export interface getStreamProfilesVariables {
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
