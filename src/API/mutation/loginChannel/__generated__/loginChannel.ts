/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginChannel
// ====================================================

export interface loginChannel_loginChannel {
  __typename: "ChannelAuthPayload";
  token: string;
}

export interface loginChannel {
  loginChannel: loginChannel_loginChannel | null;
}

export interface loginChannelVariables {
  id: string;
  code: string;
}
