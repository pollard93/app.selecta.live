/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChannelUpdateInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateChannel
// ====================================================

export interface updateChannel_updateChannel_coverImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface updateChannel_updateChannel_coverImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: updateChannel_updateChannel_coverImage_url | null;
}

export interface updateChannel_updateChannel_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface updateChannel_updateChannel_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: updateChannel_updateChannel_profileImage_url | null;
}

export interface updateChannel_updateChannel {
  __typename: "ChannelSelf";
  id: string;
  name: string | null;
  description: string | null;
  coverImage: updateChannel_updateChannel_coverImage | null;
  profileImage: updateChannel_updateChannel_profileImage | null;
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
  createdAt: any | null;
}

export interface updateChannel {
  updateChannel: updateChannel_updateChannel | null;
}

export interface updateChannelVariables {
  data?: ChannelUpdateInput | null;
}
