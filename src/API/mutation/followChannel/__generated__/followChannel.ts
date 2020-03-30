/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: followChannel
// ====================================================

export interface followChannel_followChannel {
  __typename: "ChannelProfile";
  id: string;
  following: boolean | null;
  followersEdge: number | null;
}

export interface followChannel {
  followChannel: followChannel_followChannel | null;
}

export interface followChannelVariables {
  id: string;
  unfollow?: boolean | null;
}
