/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CHANNEL_SELF_FRAGMENT
// ====================================================

export interface CHANNEL_SELF_FRAGMENT_coverImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface CHANNEL_SELF_FRAGMENT_coverImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CHANNEL_SELF_FRAGMENT_coverImage_url | null;
}

export interface CHANNEL_SELF_FRAGMENT_profileImage_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface CHANNEL_SELF_FRAGMENT_profileImage {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: CHANNEL_SELF_FRAGMENT_profileImage_url | null;
}

export interface CHANNEL_SELF_FRAGMENT {
  __typename: "ChannelSelf";
  id: string;
  name: string | null;
  description: string | null;
  coverImage: CHANNEL_SELF_FRAGMENT_coverImage | null;
  profileImage: CHANNEL_SELF_FRAGMENT_profileImage | null;
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
