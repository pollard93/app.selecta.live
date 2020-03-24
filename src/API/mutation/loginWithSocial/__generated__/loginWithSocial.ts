/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SOCIAL_PROVIDER } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: loginWithSocial
// ====================================================

export interface loginWithSocial_loginWithSocial {
  __typename: "AuthPayload";
  token: string;
}

export interface loginWithSocial {
  loginWithSocial: loginWithSocial_loginWithSocial | null;
}

export interface loginWithSocialVariables {
  provider: SOCIAL_PROVIDER;
}
