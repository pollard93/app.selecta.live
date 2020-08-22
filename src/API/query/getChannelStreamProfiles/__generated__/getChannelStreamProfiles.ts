/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelStreamProfiles
// ====================================================

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_channel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_channel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelStreamProfiles_getChannelStreamProfiles_streams_channel_profileImage_url | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getChannelStreamProfiles_getChannelStreamProfiles_streams_channel_profileImage | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelStreamProfiles_getChannelStreamProfiles_streams_image_url | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles_streams {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: getChannelStreamProfiles_getChannelStreamProfiles_streams_channel | null;
  image: getChannelStreamProfiles_getChannelStreamProfiles_streams_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  cancelled: any | null;
  tags: (getChannelStreamProfiles_getChannelStreamProfiles_streams_tags | null)[] | null;
  info: string | null;
  cost: number | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
}

export interface getChannelStreamProfiles_getChannelStreamProfiles {
  __typename: "StreamProfilesPayLoad";
  streams: getChannelStreamProfiles_getChannelStreamProfiles_streams[];
  count: number;
}

export interface getChannelStreamProfiles {
  getChannelStreamProfiles: getChannelStreamProfiles_getChannelStreamProfiles;
}

export interface getChannelStreamProfilesVariables {
  id: string;
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
