/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: verifyEmailChange
// ====================================================

export interface verifyEmailChange_verifyEmailChange_user {
  __typename: "UserSelf";
  id: string;
  email: string | null;
}

export interface verifyEmailChange_verifyEmailChange {
  __typename: "AuthPayload";
  user: verifyEmailChange_verifyEmailChange_user | null;
}

export interface verifyEmailChange {
  verifyEmailChange: verifyEmailChange_verifyEmailChange | null;
}
