/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FILE_FRAGMENT
// ====================================================

export interface FILE_FRAGMENT_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface FILE_FRAGMENT {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: FILE_FRAGMENT_url | null;
}
