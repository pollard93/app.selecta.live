/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChannelWhereInput, ChannelOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchChannels
// ====================================================

export interface searchChannels_searchChannels_channels_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface searchChannels_searchChannels_channels_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: searchChannels_searchChannels_channels_profileImage_url | null;
}

export interface searchChannels_searchChannels_channels {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: searchChannels_searchChannels_channels_profileImage | null;
}

export interface searchChannels_searchChannels {
  __typename: "ChannelProfilesPayLoad";
  channels: searchChannels_searchChannels_channels[];
  count: number;
}

export interface searchChannels {
  searchChannels: searchChannels_searchChannels;
}

export interface searchChannelsVariables {
  where?: ChannelWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: ChannelOrderByInput | null;
}
