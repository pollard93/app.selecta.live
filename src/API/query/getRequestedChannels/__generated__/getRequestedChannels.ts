/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRequestedChannels
// ====================================================

export interface getRequestedChannels_getRequestedChannels_channels {
  __typename: "RequestedChannel";
  id: string;
  name: string | null;
  description: string | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface getRequestedChannels_getRequestedChannels {
  __typename: "RequestedChannelsPayLoad";
  channels: getRequestedChannels_getRequestedChannels_channels[];
  count: number;
}

export interface getRequestedChannels {
  getRequestedChannels: getRequestedChannels_getRequestedChannels | null;
}

export interface getRequestedChannelsVariables {
  first?: number | null;
  after?: string | null;
}
