/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resetPassword
// ====================================================

export interface resetPassword_resetPassword {
  __typename: "AuthPayload";
  token: string;
}

export interface resetPassword {
  resetPassword: resetPassword_resetPassword | null;
}

export interface resetPasswordVariables {
  password: string;
}
