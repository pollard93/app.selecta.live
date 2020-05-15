/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: validateInAppPurchase
// ====================================================

export interface validateInAppPurchase_validateInAppPurchase {
  __typename: "UserSelf";
  id: string;
  credit: number | null;
}

export interface validateInAppPurchase {
  validateInAppPurchase: validateInAppPurchase_validateInAppPurchase;
}

export interface validateInAppPurchaseVariables {
  receipt: any;
}
