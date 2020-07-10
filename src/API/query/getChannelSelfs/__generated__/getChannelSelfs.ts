/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChannelWhereInput, ChannelOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelSelfs
// ====================================================

export interface getChannelSelfs_getChannelSelfs_channels_coverImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelSelfs_getChannelSelfs_channels_coverImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelSelfs_getChannelSelfs_channels_coverImage_url | null;
}

export interface getChannelSelfs_getChannelSelfs_channels_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelSelfs_getChannelSelfs_channels_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelSelfs_getChannelSelfs_channels_profileImage_url | null;
}

export interface getChannelSelfs_getChannelSelfs_channels {
  __typename: "ChannelSelf";
  id: string;
  name: string | null;
  description: string | null;
  coverImage: getChannelSelfs_getChannelSelfs_channels_coverImage | null;
  profileImage: getChannelSelfs_getChannelSelfs_channels_profileImage | null;
  verified: boolean | null;
  unreadNotificationCount: number | null;
  followersEdge: number | null;
  adminsEdge: number | null;
  pendingCredit: number | null;
  credit: number | null;
  creditMinimumStreamCost: number | null;
  creditWithdrawalValue: number | null;
  creditWithdrawalMinimum: number | null;
  freeStreamAllowance: number | null;
}

export interface getChannelSelfs_getChannelSelfs {
  __typename: "ChannelSelfsPayLoad";
  channels: getChannelSelfs_getChannelSelfs_channels[];
  count: number;
}

export interface getChannelSelfs {
  getChannelSelfs: getChannelSelfs_getChannelSelfs;
}

export interface getChannelSelfsVariables {
  where?: ChannelWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: ChannelOrderByInput | null;
}
