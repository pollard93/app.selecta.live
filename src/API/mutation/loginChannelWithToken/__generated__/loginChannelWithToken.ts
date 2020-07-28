/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginChannelWithToken
// ====================================================

export interface loginChannelWithToken_loginChannelWithToken {
  __typename: "ChannelAuthPayload";
  token: string;
}

export interface loginChannelWithToken {
  loginChannelWithToken: loginChannelWithToken_loginChannelWithToken | null;
}

export interface loginChannelWithTokenVariables {
  id: string;
}
