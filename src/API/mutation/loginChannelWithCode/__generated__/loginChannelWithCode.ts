/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginChannelWithCode
// ====================================================

export interface loginChannelWithCode_loginChannelWithCode {
  __typename: "ChannelAuthPayload";
  token: string;
}

export interface loginChannelWithCode {
  loginChannelWithCode: loginChannelWithCode_loginChannelWithCode | null;
}

export interface loginChannelWithCodeVariables {
  id: string;
  code: string;
}
