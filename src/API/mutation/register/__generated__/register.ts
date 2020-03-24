/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register {
  __typename: "AuthPayload";
  token: string;
}

export interface register {
  register: register_register | null;
}

export interface registerVariables {
  email: string;
  password: string;
}
