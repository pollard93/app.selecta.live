/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChannelSelf
// ====================================================

export interface getChannelSelf_getChannelSelf_coverImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelSelf_getChannelSelf_coverImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelSelf_getChannelSelf_coverImage_url | null;
}

export interface getChannelSelf_getChannelSelf_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getChannelSelf_getChannelSelf_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getChannelSelf_getChannelSelf_profileImage_url | null;
}

export interface getChannelSelf_getChannelSelf {
  __typename: "ChannelSelf";
  id: string;
  name: string | null;
  description: string | null;
  coverImage: getChannelSelf_getChannelSelf_coverImage | null;
  profileImage: getChannelSelf_getChannelSelf_profileImage | null;
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

export interface getChannelSelf {
  getChannelSelf: getChannelSelf_getChannelSelf;
}
