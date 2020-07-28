/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginChannelWithToken
// ====================================================

export interface loginChannelWithToken_loginChannelWithToken_channel {
  __typename: "ChannelSelf";
  id: string;
}

export interface loginChannelWithToken_loginChannelWithToken {
  __typename: "ChannelAuthPayload";
  token: string;
  channel: loginChannelWithToken_loginChannelWithToken_channel | null;
}

export interface loginChannelWithToken {
  loginChannelWithToken: loginChannelWithToken_loginChannelWithToken | null;
}

export interface loginChannelWithTokenVariables {
  id: string;
}
