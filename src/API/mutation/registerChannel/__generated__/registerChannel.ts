/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerChannel
// ====================================================

export interface registerChannel_registerChannel {
  __typename: "RequestedChannel";
  id: string;
  name: string | null;
  description: string | null;
  createdAt: any | null;
  updatedAt: any | null;
}

export interface registerChannel {
  registerChannel: registerChannel_registerChannel | null;
}

export interface registerChannelVariables {
  name: string;
  description: string;
}
