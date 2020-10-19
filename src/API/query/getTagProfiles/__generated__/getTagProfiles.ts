/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TagWhereInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getTagProfiles
// ====================================================

export interface getTagProfiles_getTagProfiles_tags {
  __typename: "TagProfile";
  id: string;
  title: string | null;
}

export interface getTagProfiles_getTagProfiles {
  __typename: "TagProfilesPayload";
  count: number;
  tags: (getTagProfiles_getTagProfiles_tags | null)[] | null;
}

export interface getTagProfiles {
  getTagProfiles: getTagProfiles_getTagProfiles;
}

export interface getTagProfilesVariables {
  where?: TagWhereInput | null;
  after?: string | null;
  first?: number | null;
}
