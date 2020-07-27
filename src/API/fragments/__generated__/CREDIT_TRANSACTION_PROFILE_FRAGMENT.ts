/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CREDIT_TRANSACTION_PROFILE_FRAGMENT
// ====================================================

export interface CREDIT_TRANSACTION_PROFILE_FRAGMENT_stream {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
}

export interface CREDIT_TRANSACTION_PROFILE_FRAGMENT_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
}

export interface CREDIT_TRANSACTION_PROFILE_FRAGMENT {
  __typename: "CreditTransactionProfile";
  id: string | null;
  credit: number | null;
  stream: CREDIT_TRANSACTION_PROFILE_FRAGMENT_stream | null;
  channel: CREDIT_TRANSACTION_PROFILE_FRAGMENT_channel | null;
  approved: any | null;
  reversed: any | null;
  createdAt: any | null;
}
