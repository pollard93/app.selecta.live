/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChannelWhereInput, ChannelOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelProfiles
// ====================================================

export interface getChannelProfiles_getChannelProfiles_channels_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelProfiles_getChannelProfiles_channels_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelProfiles_getChannelProfiles_channels_profileImage_url | null;
}

export interface getChannelProfiles_getChannelProfiles_channels {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
  profileImage: getChannelProfiles_getChannelProfiles_channels_profileImage | null;
}

export interface getChannelProfiles_getChannelProfiles {
  __typename: "ChannelProfilesPayLoad";
  channels: getChannelProfiles_getChannelProfiles_channels[];
  count: number;
}

export interface getChannelProfiles {
  getChannelProfiles: getChannelProfiles_getChannelProfiles;
}

export interface getChannelProfilesVariables {
  where?: ChannelWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: ChannelOrderByInput | null;
}
