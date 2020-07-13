/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreditTransactionOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCreditTransactionProfiles
// ====================================================

export interface getCreditTransactionProfiles_getCreditTransactionProfiles_transactions_stream {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
}

export interface getCreditTransactionProfiles_getCreditTransactionProfiles_transactions_channel {
  __typename: "ChannelProfile";
  id: string;
  name: string | null;
}

export interface getCreditTransactionProfiles_getCreditTransactionProfiles_transactions {
  __typename: "CreditTransactionProfile";
  id: string | null;
  credit: number | null;
  stream: getCreditTransactionProfiles_getCreditTransactionProfiles_transactions_stream | null;
  channel: getCreditTransactionProfiles_getCreditTransactionProfiles_transactions_channel | null;
  approved: any | null;
  reversed: any | null;
  createdAt: any | null;
}

export interface getCreditTransactionProfiles_getCreditTransactionProfiles {
  __typename: "CreditTransactionProfilesPayload";
  transactions: getCreditTransactionProfiles_getCreditTransactionProfiles_transactions[];
  count: number;
}

export interface getCreditTransactionProfiles {
  getCreditTransactionProfiles: getCreditTransactionProfiles_getCreditTransactionProfiles;
}

export interface getCreditTransactionProfilesVariables {
  first?: number | null;
  after?: string | null;
  orderBy?: CreditTransactionOrderByInput | null;
}
